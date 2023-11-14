export const setAccess = (access) => ({
    type: "SET_ACCESS",
    payload: access,
  });

export const setUser = (user) => ({
  type: "SET_USER",
  payload: user
})

export const setSuccess = (success) => ({
  type: "SET_SUCCESS",
  payload: success
})

export const setBar = (blocked) => ({
  type: "SET_BAR",
  payload: blocked
})

export const setMaintenance = (underMaintenance) => ({
  type: "SET_MAINTENANCE",
  payload: underMaintenance
})