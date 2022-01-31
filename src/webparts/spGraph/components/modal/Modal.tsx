import * as React from 'react';
import {useState} from 'react';
import styles from './Modal.module.scss'
import { MSGraphClient } from '@microsoft/sp-http';

const Modal = (props) => {

    //console.log(typeof(parseInt(props.employee.id)), parseInt(props.employee.id))

    const [title, setTitle] = useState(props.employee.Title);
    const [designation, setDesignation] = useState(props.employee.Designation);
    const [loading, setLoading]=useState(false);

    const handleSubmit=(e)=>{
        e.preventDefault();
        props.context.msGraphClientFactory.getClient().then(async (graphClient: MSGraphClient)=> {
            const employee = {
                    Title: title,
                    Designation: designation
            };
            await graphClient.api(`sites/0a65d918-0f87-4f2f-9106-5131b2846962/lists/84154aa7-ad43-49d9-ab49-a72ca02bd107/items/${parseInt(props.employee.id)}/fields`).update(employee);
        });
        props.setModal(false);
        props._getList();
    }

  return (
    <div className={styles.modalWrapper}>
        <div className={styles.modalInner}>
            <form onSubmit={handleSubmit}>
                <div className={styles.formControl}>
                    <label htmlFor="emloyeeTitle">Enter Name:</label>
                    <input type="text" value={title} required onChange={(e)=>setTitle(e.target.value)} id='emloyeeTitle' />
                </div>
                <div className={styles.formControl}>
                    <label htmlFor="emloyeeDesignation">Enter Designation:</label>
                    <input type="text" value={designation} required onChange={(e)=>setDesignation(e.target.value)} id='emloyeeDesignation' />
                </div>
                <div className={styles.formControl}>
                    <input className={styles.btn} type="submit" disabled={loading?true:false} value={loading?'Updating...':'Update Record'} />
                </div>
            </form>
        </div>
    </div>
  );
};

export default Modal;
