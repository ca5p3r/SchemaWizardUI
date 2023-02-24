import { v4 as uuidv4 } from "uuid";

export const triggerSSHTunnel = (x = false) => {
  return {
    type: "triggerSSHTunnel",
    payload: x,
  };
};
export const triggerKeyAuth = (x = false) => {
  return {
    type: "triggerKeyAuth",
    payload: x,
  };
};
export const triggerTableCompare = (x = false) => {
  return {
    type: "triggerTableCompare",
    payload: x,
  };
};
export const addServer = (x = {}) => {
  const serverID = uuidv4();
  return {
    type: "addServer",
    payload: { ...x, serverID },
  };
};
export const triggerToast = (x = {}) => {
  const toastID = uuidv4();
  return {
    type: "triggerToast",
    payload: { ...x, toastID },
  };
};
export const triggerIsLoading = (x = false) => {
  return {
    type: "triggerIsLoading",
    payload: x,
  };
};
export const updateQuickTable = (x = {}) => {
  return {
    type: "updateQuickTable",
    payload: x,
  };
};

export const updateQuickSchema = (x = {}) => {
  return {
    type: "updateQuickSchema",
    payload: x,
  };
};

export const updateDetailedTable = (x = {}) => {
  return {
    type: "updateDetailedTable",
    payload: x,
  };
};

export const updateDetailedSchema = (x = {}) => {
  return {
    type: "updateDetailedSchema",
    payload: x,
  };
};
