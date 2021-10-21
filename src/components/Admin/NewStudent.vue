<template>
  <div class="field">
    <label class="label">Add New Student</label>
    <div class="field is-grouped">
      <div class="control">
        <input
          class="input"
          type="text"
          v-model.trim="data.regno"
          placeholder="regno"
        />
      </div>

      <div class="control">
        <input
          class="input"
          type="text"
          v-model.trim="data.ename"
          placeholder="English Name"
        />
      </div>
      <div class="control">
        <input
          class="input"
          type="text"
          v-model.trim="data.cname"
          placeholder="Chinese Name"
        />
      </div>
    </div>
    <div class="field is-grouped">
      <div class="control">
        <input
          class="input"
          type="text"
          v-model.trim="data.classCode"
          placeholder="Class"
        />
      </div>
      <div class="control">
        <input
          class="input"
          type="Number"
          v-model.number="data.classNumber"
          placeholder="Class Number"
        />
      </div>
    </div>
    <div class="field is-grouped">
      <div class="control">
        <div class="select">
          <select name="Sex" id="" aria-placeholder="Sex" v-model="data.sex">
            <option value="" disabled>Sex</option>
            <option value="MALE">Male</option>
            <option value="FEMALE">Female</option>
          </select>
        </div>
      </div>
      <div class="control">
        <div class="select">
          <select
            name="House"
            id=""
            aria-placeholder="House"
            v-model="data.house"
          >
            <option value="" disabled>House</option>
            <option value="RED">Red</option>
            <option value="YELLOW">Yellow</option>
            <option value="BLUE">Blue</option>
            <option value="GREEN">Green</option>
          </select>
        </div>
      </div>
    </div>
    <div class="field">
      <div class="control">
        <button class="button is-info" @click="onClick">Add</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import { HOUSE, SEX, Student } from "@/graphql/student";
import { useAddStudent } from "@/composables/student";
import { useStore } from "vuex";
import { useAlertError, useAlertSuccessMessage } from "@/helper";

export default defineComponent({
  setup() {
    const { mutate: addStudent, onError } = useAddStudent();
    const store = useStore();
    const TITLE = "adding new student";
    onError(useAlertError(TITLE));
    const alertMessage = useAlertSuccessMessage();

    const data = reactive({
      classCode: "",
      classNumber: undefined,
      schoolYear: store.state.schoolYear,
      cname: "",
      ename: "",
      regno: "",
      house: "" as HOUSE,
      sex: "" as SEX,
      senTypes: [],
    } as Student);

    const onClick = async () => {
      const result = await addStudent({
        data,
      });
      const regno = result?.data?.addStudent.regno;

      if (regno) {
        alertMessage(TITLE, `${regno} is added successfully`);
      }
    };
    return {
      data,
      onClick,
    };
  },
});
</script>
