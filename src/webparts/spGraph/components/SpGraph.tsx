import * as React from 'react';
import {useState, useEffect} from 'react';
import styles from './SpGraph.module.scss';
import { MSGraphClient } from '@microsoft/sp-http';
import AddEmployee from './employee/AddEmployee';
import Modal from './modal/Modal';

export default function SpGraph(props) {

  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const [emp, setEmp] = useState(null)
  const siteId = '0a65d918-0f87-4f2f-9106-5131b2846962';
  const listId = '84154aa7-ad43-49d9-ab49-a72ca02bd107';


  const _getList = ()=>{
    setLoading(true)
    props.context.msGraphClientFactory.getClient().then(async(graphClient: MSGraphClient)=> {
      await graphClient.api(`sites/${siteId}/lists/${listId}/items?expand=fields`).get((error, events)=>{
        if(error){
          console.log(error);
        }else{
          setEmployees(events.value);
          setLoading(false);
        }
      })
    });
  }

  const _handleDelete=(id:number)=>{
    props.context.msGraphClientFactory.getClient().then(async(graphClient: MSGraphClient)=> {
      await graphClient.api(`sites/${siteId}/lists/${listId}/items/${id}`).delete();
      _getList();
    });
    
  }

  const _handleEdit=(e)=>{
    setModal(true);
    setEmp(e)
  }

  useEffect(()=>{
    _getList();
  },[])

    return (
      <div className={ styles.spGraph }>
        <div className={ styles.container }>
          <div className={ styles.row }>
            <div className={ styles.column }>
              <AddEmployee context={props.context} getList={_getList}/>
              <p className={ styles.subTitle }>All Employees</p>
              {
                loading?<h1>Loading...</h1>: employees.length<1?<h1>No Record found...</h1> : employees.map((employee)=>{
                  return (
                    <div className={styles.card}>
                        <h3>{employee.fields.Title}</h3>
                        <p>{employee.fields.Designation}</p>
                        <button onClick={()=>_handleEdit(employee.fields)}>Edit</button>
                        <button onClick={()=>_handleDelete(employee.fields.id)}>Delete</button>
                    </div>
                  );
                })
              }
              {
                modal?<Modal _getList={_getList} employee={emp}  context={props.context} setModal={setModal}/>:null
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
