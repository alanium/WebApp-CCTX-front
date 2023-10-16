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
  const [input, setInput] = useState({});
  const [projectId, setProjectId] = useState({
    selected_project: null,
    project_name: "",
    project_id: "",
  });
  const [category, setCategory] = useState({
    selected_category: [],
    category_name: [],
    category_id: [],
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
    selected_sub: {},
    sub_name: "",
    sub_id: "",
  });
  const role = useSelector((state) => state.user.role);
  const [isEditTaskReady, setIsEditTaskReady] = useState(false)
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
    setProjectId({
      selected_project: JSON.parse(
        event.target.options[event.target.selectedIndex].getAttribute("data")
      ),
      project_name:
        event.target.options[event.target.selectedIndex].getAttribute("name"),
      project_id:
        event.target.options[event.target.selectedIndex].getAttribute("id"),
    });
    setInput({
      project_id:
        event.target.options[event.target.selectedIndex].getAttribute("id"),
      action: "get_task",
    });
    console.log(input);
  };

  const catChangeHandler = (event) => {
    const catName = event.target.name;
    const catId = event.target.id;
    const categoryObj = JSON.parse(event.target.getAttribute("data"));
    const isChecked = event.target.checked;

    setCategory((prevInput) => {
      if (isChecked) {
        return {
          ...prevInput,
          selected_category: [...prevInput.selected_category, categoryObj],
          category_name: [...prevInput.category_name, catName],
          category_id: [...prevInput.category_id, catId],
          action: "preview",
        };
      } else {
        return {
          ...prevInput,
          selected_category: prevInput.selected_category.filter(
            (category) => category != categoryObj
          ),
          category_name: prevInput.category_name.filter(
            (category) => category !== catName
          ),
          category_id: prevInput.category_id.filter(
            (category) => category !== catId
          ),
          action: "preview",
        };
      }
    });
  };

  const masterChangeHandler = (event) => {
    const masterName = event.target.name;
    const masterId = event.target.id;
    const masterObj = JSON.parse(event.target.getAttribute("data"));
    const isChecked = event.target.checked;

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
            (master) => master !== masterObj
          ),
          master_name: prevInput.master_name.filter(
            (master) => master !== masterName
          ),
          master_id: prevInput.master_id.filter(
            (master) => master !== masterId
          ),
        };
      }
    });
    console.log(masterObj);
  };

  const processChangeHandler = (event) => {
    const processName = event.target.name;
    const processId = event.target.id;
    const process = JSON.parse(event.target.getAttribute("data"));
    const isChecked = event.target.checked;

    setProcess((prevInput) => {
      if (isChecked) {
        return {
          ...prevInput,
          selected_process: [...prevInput.selected_process, process],
          process_name: [...prevInput.process_name, processName],
          process_id: [...prevInput.process_id, processId],
          action: "preview",
        };
      } else {
        return {
          ...prevInput,
          selected_process: prevInput.selected_process.filter(
            (process) => process !== process
          ),
          process_name: prevInput.process_name.filter(
            (process) => process !== processName
          ),
          process_id: prevInput.process_id.filter(
            (process) => process !== processId
          ),
          action: "preview",
        };
      }
    });
    console.log(process);
  };

  const subChangeHandler = (event) => {
    setSubId({
      selected_sub: JSON.parse(
        event.target.options[event.target.selectedIndex].getAttribute("data")
      ),
      sub_id:
        event.target.options[event.target.selectedIndex].getAttribute("id"),
      sub_name:
        event.target.options[event.target.selectedIndex].getAttribute("name"),
    });
    console.log(subId);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    if (input.id !== null ) {
      try {
        let result;

        // Check conditions to determine what to submit
        if (submitCounter == 0) {
          result = await props.enviarDatos(
            {
              action: "get_category",
            },
            "generate_wo"
          );
          setIsProjectReady(true);
        } else if (submitCounter == 1) {
          console.log(category.category_id);
          result = await props.enviarDatos(
            {
              action: "get_master",
              category_id: category.category_id,
            },
            "generate_wo"
          );
          setIsCategoryReady(true);
        } else if (submitCounter == 2) {
          console.log(category.category_id);
          result = await props.enviarDatos(
            { action: "get_process", category_id: category.category_id },
            "generate_wo"
          );
          setIsMitemsReady(true);
        } else if (submitCounter == 3) {
          result = await props.enviarDatos(
            { action: "get_subcontractor" },
            "generate_wo"
          );
          setIsProcessReady(true); 
        } else if (submitCounter == 4) {
          result = await props.enviarDatos(
            { action: "get_subcontractor" },
            "generate_wo"
          );
          setIsEditTaskReady(true); 
        } else if (submitCounter == 5) {
          console.log([projectId, subId]);
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
        console.log(submitCounter);
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
                              {isEditTaskReady ? (
                                <div>
                                  {isWoReady ? (
                                    <WoPreview
                                      project={projectId}
                                      sub={subId}
                                      master={master}
                                      process={process}
                                      category={category}
                                    />
                                  ) : (
                                   <SelectSub
                                    worders={worders}
                                    subChangeHandler={subChangeHandler}
                                    handleSubmit={handleSubmit}
                                   />
                                  )}
                                </div>
                              ) : (
                                <EditTask
                                  project={projectId}
                                  sub={subId}
                                  master={master}
                                  process={process}
                                  category={category}
                                  submit={handleSubmit}
                                />
                              )}
                            </div>
                          ) : (
                            <SelectProcesses
                            worders={worders}
                            handleSubmit={handleSubmit}
                            processChangeHandler={processChangeHandler}
                            />
                          )}
                        </div>
                      ) : (
                        <SelectMasterItems
                        worders={worders}
                        masterChangeHandler={masterChangeHandler}
                        handleSubmit={handleSubmit}
                        />
                      )}
                    </div>
                  ) : (
                    <SelectCategory 
                    worders={worders}
                    handleSubmit={handleSubmit}
                    catChangeHandler={catChangeHandler}
                    />
                  )}
                </div>
              ) : (
                <SelectProject 
                worders={worders}
                changeHandler={changeHandler}
                handleSubmit={handleSubmit}
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
