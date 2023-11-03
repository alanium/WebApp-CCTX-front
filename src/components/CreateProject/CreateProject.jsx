import React, { useEffect, useState } from "react";
import { BiNoEntry, BiXCircle } from "react-icons/bi";
import { useSelector } from "react-redux";
import { WoPreview } from "../WoPreview/WoPreview";
import { ImSpinner8 } from "react-icons/im";
import styles from "./CreateProject.module.css";
import { SelectSub } from "../SelectSub/SelectSub";
import { SelectProcesses } from "../SelectProcesses/SelectProcesses";
import { SelectMasterItems } from "../SelectMasterItems/SelectMasterItems";
import { SelectCustomer } from "../SelectCustomer/SelectCustomer";
import { CreateWo } from "../CreateWo/CreateWo";

export function CreateProject(props) {
  const [worders, setWorders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(false);
  const [input, setInput] = useState({});
  const [customer, setCustomer] = useState({
    selected_customer: null,
    customer_name: "",
    customer_id: "",
  });
  const [category, setCategory] = useState({
    category_name: [null],
  });
  const [master, setMaster] = useState({
  });
  const [process, setProcess] = useState({
    selected_process: [],
    process_name: [],
    process_id: [],
  });

  const [lead, setLead] = useState({
    lead_id: null,
  });
  const [subId, setSubId] = useState({
    selected_sub: null,
    sub_name: null,
    sub_id: null,
  });
  const user = useSelector((state) => state.user);
  const role = useSelector((state) => state.user.role);
  const [isExpanded, setExpanded] = useState({

  });
  const [isProjectReady, setIsProjectReady] = useState(false);
  const [isMitemsReady, setIsMitemsReady] = useState(false);
  const [isWoReady, setIsWoReady] = useState(false);
  const [submitCounter, setSubmitcounter] = useState(0);



  useEffect(() => {
    async function fetchData() {
      try {
        const result = await props.obtenerJSON("create_project");
        if (result) {
          console.log(result);
          setWorders(result);
        } else {
          console.log("No funcionó");
        }
      } catch (error) {
        console.error("Error: ", error);
      }
    }

    fetchData();
  }, []);

  const updateMaster = (updatedMaster) => {
    setMaster(updatedMaster);
  };

  const changeHandler = (event) => {
    if (
      event.target.options[event.target.selectedIndex].getAttribute("data") &&
      event.target.options[event.target.selectedIndex].getAttribute("name") &&
      event.target.options[event.target.selectedIndex].getAttribute("id")
    )
      console.log(lead);

    setCustomer({
      selected_customer: JSON.parse(
        event.target.options[event.target.selectedIndex].getAttribute("data")
      ),
      customer_name:
        event.target.options[event.target.selectedIndex].getAttribute("name"),
      customer_id:
        event.target.options[event.target.selectedIndex].getAttribute("id"),
    });

    setLead({
      lead_id:
        event.target.options[event.target.selectedIndex].getAttribute("lead"),
    });
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    if (input.id !== null) {
      try {
        let result;
        if (submitCounter == 0) {
          console.log(customer)
          result = await props.enviarDatos(
            {
              action: "get_master",
              selected_customer: customer.selected_customer,
            },
            "create_project"
          );
          setIsProjectReady(true);
        } else if (submitCounter == 1) {
          result = await props.enviarDatos(
            { data: master,
              action: "work_order" },
            "create_project"
          );
          setIsMitemsReady(true);
        } else if (submitCounter == 2) {
          
        } else if (submitCounter == 3) {
          result = await props.enviarDatos(
            {
              customer_id: customer.customer_id,
              sub_id: subId.sub_id,
              action: "preview",
            },
            "create_project"
          );
          setIsWoReady(true);
        }
        setSubmitcounter(submitCounter + 1);
        if (result) {
          setWorders(result);
          console.log(result);
        }
      } catch (error) {
        console.error("Error: ", error);
      } finally {
        setIsSubmitting(false);
      }
    } else {
      console.log("Please fill in the form before submitting");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="global-container">
      {isSubmitting ? (
        <div className={styles.spinContainer} style={{ zIndex: 1000 }}>
          <div className={styles.spinContainer}>
            <ImSpinner8 className={styles.spin} />
          </div>
        </div>
      ) : null}
      <div className={styles.titleDiv}>
        <label className="global-card-title">Create Project</label>
      </div>
      {role !== "member" ? (
        <div>
          {isLoading ? (
            <div>
              <p style={{ color: "white" }}>Loading data...</p>
            </div>
          ) : (
            <div>
              {isProjectReady ? (
                <div>
                  {isMitemsReady ? (
                    <div>
                      {isWoReady ? (
                        <WoPreview
                          customer={customer}
                          sub={subId}
                          master={master}
                          process={process}
                          category={category}
                          user={user}
                          enviarDatos={props.enviarDatos}
                          selected_project={projectId.selected_project}
                          selected_master={master.selected_master}
                          selected_sub={subId.selected_sub}
                          selected_processes={process.selected_process}
                        />
                      ) : (
                        <CreateWo
                          setMaster={updateMaster}
                          worders={worders}
                          handleSubmit={handleSubmit}
                          master={master}
                        />
                      )}
                    </div>
                  ) : (
                    <SelectMasterItems
                      worders={worders}
                      setIsMitemsReady={setIsMitemsReady}
                      handleSubmit={handleSubmit}
                      master={master}
                      setMaster={updateMaster}
                    />
                  )}
                </div>
              ) : (
                <SelectCustomer
                  worders={worders}
                  changeHandler={changeHandler}
                  handleSubmit={handleSubmit}
                  customer={customer}
                />
              )}
            </div>
          )}
        </div>
      ) : (
        <div className={styles.titleDiv}>
          <div>
            <label className="global-card-title">You Don't Have Access</label>
          </div>
          <div
            style={{
              textAlign: "center",
              marginTop: "20px",
              marginBottom: "0px",
            }}
          >
            <label className="global-card-title" style={{ fontSize: "70px" }}>
              <BiNoEntry />
            </label>
          </div>
        </div>
      )}
    </div>
  );
}
