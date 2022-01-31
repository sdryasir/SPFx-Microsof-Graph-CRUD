import * as React from 'react';
import {useState} from 'react';
import { MSGraphClient } from '@microsoft/sp-http';
import styles from './AddEmployee.module.scss';

const AddEmployee = (props) => {

    const [title, setTitle] = useState('');
    const [designation, setDesignation] = useState('');
    const [loading, setLoading]=useState(false);

    const _createEmployee = () =>{
        setLoading(true);
        props.context.msGraphClientFactory.getClient().then(async (graphClient: MSGraphClient)=> {
        const employee = {
            fields: {
                Title: title,
                Designation: designation
            }
        };
        await graphClient.api("sites/0a65d918-0f87-4f2f-9106-5131b2846962/lists/84154aa7-ad43-49d9-ab49-a72ca02bd107/items").post(employee);
        setLoading(false);
        });
    }

    const handleSubmit=(e)=>{
        e.preventDefault();
        setTitle('');
        setDesignation('');
        _createEmployee();
        props.getList();
    }

  return (
    <div>
        <form onSubmit={handleSubmit}>
            <div className={styles.formControl}>
                <label htmlFor="emloyeeTitle">Enter Name:</label>
                <input type="text" required onChange={(e)=>setTitle(e.target.value)} id='emloyeeTitle' />
            </div>
            <div className={styles.formControl}>
                <label htmlFor="emloyeeDesignation">Enter Designation:</label>
                <input type="text" required onChange={(e)=>setDesignation(e.target.value)} id='emloyeeDesignation' />
            </div>
            <div className={styles.formControl}>
                <input className={styles.btn} type="submit" disabled={loading?true:false} value={loading?'Saving...':'Save Record'} />
            </div>
        </form>
    </div>
  );
};

export default AddEmployee;
