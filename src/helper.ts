import { ApolloError } from "@apollo/client";
import { useStore } from "vuex";
import { AlertMessage } from "./store";

export const useAlertError = (title: string): ((err: ApolloError) => void) => {
  const store = useStore();
  const updateAlertMessage = (alertMessage: AlertMessage) => {
    store.commit("updateAlertMessage", alertMessage);
  };
  return (err: ApolloError): void => {
    updateAlertMessage({
      title: `Error on ${title}`,
      message: err.message,
      color: "is-danger",
    });
    console.error(err);
  };
};

export const useAlertSuccessMessage = (): ((
  title: string,
  message: string,
) => void) => {
  const store = useStore();
  return (title: string, message: string): void => {
    store.commit("updateAlertMessage", {
      title: `${title[0].toUpperCase() + title.substring(1)}`,
      message: message,
      color: "is-success",
    });
  };
};
