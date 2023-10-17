import React, { useEffect, useState } from "react";
import { BiNoEntry, BiXCircle } from "react-icons/bi";
import { useSelector } from "react-redux";
import { WoPreview } from "../WoPreview/WoPreview";
import { ImSpinner8 } from "react-icons/im";
import styles from "./CreateWo.module.css";
import { EditTask } from "../EditTask/EditTask";
import { SelectSub } from "../SelectSub/SelectSub";
import { SelectProcesses } from "../SelectProcesses/SelectProcesses";
import { SelectMasterItems } from "../SelectMasterItems/SelectMasterItems";
import { SelectCategory } from "../SelectCategory/SelectCategory";
import { SelectProject } from "../SelectProject/SelectProject";

export function CreateWo(props) {
  const [worders, setWorders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(false);
  const [input, setInput] = useState({
  });
  const [projectId, setProjectId] = useState({
    selected_project: null,
    project_name: "",
    project_id: "",
  });
  const [category, setCategory] = useState({
    selected_category: [null],
    category_name: [null],
    category_id: [null],
  });
  const [master, setMaster] = useState({
    selected_master: [],
    master_name: [],
    master_id: [],
  });
  const [process, setProcess] = useState({
    selected_process: [],
    process_name: [],
    process_id: [],
  });
  const [subId, setSubId] = useState({
    selected_sub: null,
    sub_name: null,
    sub_id: null,
  });
  const user = useSelector((state) => state.user)
  const role = useSelector((state) => state.user.role);
  const [isCategoryReady, setIsCategoryReady] = useState(false);
  const [isProjectReady, setIsProjectReady] = useState(false);
  const [isMitemsReady, setIsMitemsReady] = useState(false);
  const [isProcessReady, setIsProcessReady] = useState(false);
  const [isWoReady, setIsWoReady] = useState(false);
  const [submitCounter, setSubmitcounter] = useState(0);

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await props.obtenerJSON("generate_wo");
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

  const changeHandler = (event) => {
    if (
      event.target.options[event.target.selectedIndex].getAttribute("data") &&
      event.target.options[event.target.selectedIndex].getAttribute("name") &&
      event.target.options[event.target.selectedIndex].getAttribute("id")
    )
    console.log(
      projectId
    )

    setProjectId({
      selected_project: JSON.parse(
        event.target.options[event.target.selectedIndex].getAttribute("data")
      ),
      project_name:
        event.target.options[event.target.selectedIndex].getAttribute("name"),
      project_id:
        event.target.options[event.target.selectedIndex].getAttribute("id"),
    });
  };

  const catChangeHandler = (event) => {

    console.log (
      event.target.options[event.target.selectedIndex].getAttribute("data"),
      event.target.options[event.target.selectedIndex].getAttribute("id"),
      event.target.options[event.target.selectedIndex].getAttribute("name")
    )
    setCategory({
      selected_category: [JSON.parse(
        event.target.options[event.target.selectedIndex].getAttribute("data")
      )],
      category_id:
        [event.target.options[event.target.selectedIndex].getAttribute("id")],
      category_name:
        [event.target.options[event.target.selectedIndex].getAttribute("name")],
    });
  };

  const masterChangeHandler = (event) => {
    const masterName = event.target.name;
    const masterId = event.target.id;
    const masterObj = JSON.parse(event.target.getAttribute("data"));
    const isChecked = event.target.checked;

    console.log(master)
    
    if (masterName && masterId && masterObj) {
    setMaster((prevInput) => {
      if (isChecked) {
        return {
          ...prevInput,
          selected_master: [...prevInput.selected_master, masterObj],
          master_name: [...prevInput.master_name, masterName],
          master_id: [...prevInput.master_id, masterId],
        };
      } else {
        return {
          ...prevInput,
          selected_master: prevInput.selected_master.filter(
            (data) => data.id !== masterObj.id
          ),
          master_name: prevInput.master_name.filter(
            (name) => name !== masterName
          ),
          master_id: prevInput.master_id.filter(
            (id) => id !== masterId
          ),
        };
      }
    })}
  };

  const processChangeHandler = (event) => {
    const processName = event.target.name;
    const processId = event.target.id;
    const process = JSON.parse(event.target.getAttribute("data"));
    const isChecked = event.target.checked;

    if (processName && processId && process) {
      setProcess((prevInput) => {
        if (isChecked) {
          return {
            ...prevInput,
            selected_process: [...prevInput.selected_process, process],
            process_name: [...prevInput.process_name, processName],
            process_id: [...prevInput.process_id, processId],
          };
        } else {
          return {
            ...prevInput,
            selected_process: prevInput.selected_process.filter(
              (data) => data.id !== process
            ),
            process_name: prevInput.process_name.filter(
              (name) => name !== processName
            ),
            process_id: prevInput.process_id.filter(
              (id) => id !== processId
            ),
          };
        }
      });
    }
  };

  const subChangeHandler = (event) => {

    if (
      event.target.options[event.target.selectedIndex].getAttribute("data") &&
      event.target.options[event.target.selectedIndex].getAttribute("id") &&
      event.target.options[event.target.selectedIndex].getAttribute("name")
    )
    console.log(subId)
    setSubId({
      selected_sub: JSON.parse(
        event.target.options[event.target.selectedIndex].getAttribute("data")
      ),
      sub_id:
        event.target.options[event.target.selectedIndex].getAttribute("id"),
      sub_name:
        event.target.options[event.target.selectedIndex].getAttribute("name"),
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    if (input.id !== null ) {
      try {
        let result;
        if (submitCounter == 0) {
          result = await props.enviarDatos(
            {
              action: "get_category",
            },
            "generate_wo"
          );
          setIsProjectReady(true);
        } else if (submitCounter == 1) {
          console.log(input);
          result = await props.enviarDatos(
            {
              action: "get_master",
              category_id: category.category_id,
            },
            "generate_wo"
          );
          setIsCategoryReady(true);
        } else if (submitCounter == 2) {
          console.log(input);
          result = await props.enviarDatos(
            { action: "get_process", category_id: category.category_id },
            "generate_wo"
          );
          setIsMitemsReady(true);
        } else if (submitCounter == 3) {
          console.log(input)
          result = await props.enviarDatos(
            { action: "get_subcontractor" },
            "generate_wo"
          );
          setIsProcessReady(true); 

        } else if (submitCounter == 4) {
          console.log(input);
          result = await props.enviarDatos(
            {
              project_id: projectId.project_id,
              sub_id: subId.sub_id,
              action: "preview",
            },
            "generate_wo"
          );
          setIsWoReady(true);
        }
        setSubmitcounter(submitCounter + 1);
        console.log(input);
        if (result) {
          console.log(result);
          setWorders(result);
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
        <label className="global-card-title" style={{ marginBottom: "20px" }}>
          Generate Work Order
        </label>
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
                  {isCategoryReady ? (
                    <div>
                      {isMitemsReady ? (
                        <div>
                          {isProcessReady ? (
                                <div>
                                  {isWoReady ? (
                                    <WoPreview
                                      project={projectId}
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
                                   <SelectSub
                                    worders={worders}
                                    subChangeHandler={subChangeHandler}
                                    handleSubmit={handleSubmit}
                                    sub={subId}
                                    process={process}
                                    master={master}
                                   />
                                  )}
                                </div>
                          ) : (
                            <SelectProcesses
                            worders={worders}
                            handleSubmit={handleSubmit}
                            processChangeHandler={processChangeHandler}
                            submitCounter={submitCounter}
                            setSubmitcounter={setSubmitcounter}
                            isMitemsReady={isMitemsReady}
                            />
                          )}
                        </div>
                      ) : (
                        <SelectMasterItems
                        worders={worders}
                        masterChangeHandler={masterChangeHandler}
                        handleSubmit={handleSubmit}
                        master={master}
                        />
                      )}
                    </div>
                  ) : (
                    <SelectCategory 
                    worders={worders}
                    handleSubmit={handleSubmit}
                    catChangeHandler={catChangeHandler}
                    category={category}
                    />
                  )}
                </div>
              ) : (
                <SelectProject 
                worders={worders}
                changeHandler={changeHandler}
                handleSubmit={handleSubmit}
                project={projectId}
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
