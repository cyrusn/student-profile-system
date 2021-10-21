import { createStore, createLogger } from "vuex";
import Config from "@/config";

export interface AlertMessage {
  title: string;
  message: string;
  color: "is-danger" | "is-success" | null;
}

export interface Query {
  classCode?: string;
  groupName?: string;
}

export interface State {
  schoolYear: number;
  selectedRegno: string;
  regnos: string[];
  isCreateNewComment: boolean;
  alertMessage: AlertMessage;
  query: Query;
}
const plugins = [];

if (process.env.NODE_ENV !== "production") {
  plugins.push(createLogger());
}

export default createStore<State>({
  plugins,
  state: {
    schoolYear: Config.schoolYear,
    regnos: [],
    selectedRegno: "",
    isCreateNewComment: false,
    alertMessage: {
      title: "",
      message: "",
      color: null,
    },
    query: {
      classCode: "",
      groupName: "",
    },
  },
  mutations: {
    updateSchoolYear(state: State, schoolYear: number): void {
      state.schoolYear = schoolYear;
    },
    updateRegnos(state: State, regnos: string[]): void {
      state.regnos = regnos;
    },
    updateSelectedRegno(state: State, regno: string): void {
      state.selectedRegno = regno;
    },
    toggleIsCreateNewComment(state: State): void {
      state.isCreateNewComment = !state.isCreateNewComment;
    },
    updateQuery(state: State, query: Query) {
      const { classCode, groupName } = query;
      if (classCode) {
        state.query.classCode = classCode;
      }
      if (groupName) {
        state.query.groupName = groupName;
      }
    },
    updateAlertMessage(state: State, alertMessage: AlertMessage): void {
      const { title, message, color } = alertMessage;
      state.alertMessage.title = title;
      state.alertMessage.message = message;
      state.alertMessage.color = color;
    },
    resetAlertMessage(state: State): void {
      state.alertMessage.message = "";
      state.alertMessage.title = "";
      state.alertMessage.color = null;
    },
  },
  actions: {},
});
