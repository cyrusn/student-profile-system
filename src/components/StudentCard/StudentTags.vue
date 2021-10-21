<template>
  <div class="tags are-normal has-text-centered">
    <span class="tag is-light is-size-7"> {{ " " }}{{ regno }}</span>
    <span
      class="tag is-light"
      :class="sex === 'MALE' ? 'is-link' : 'is-danger'"
      >{{ sex }}</span
    >
    <span class="tag" :class="houseClassName">{{ house }}</span>
    <span class="tag" v-for="(senType, key) in senTypes" :key="key"
      >{{ getSenShortname(senType) }}
    </span>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from "vue";
import { Student, HOUSE, SEN_TYPE } from "@/graphql/student";

export default defineComponent({
  props: {
    student: {
      type: Object as PropType<Student>,
      required: true,
    },
  },
  setup(props) {
    const regno = computed(() => props.student.regno);
    const sex = computed(() => props.student.sex);
    const house = computed(() => props.student.house);
    const senTypes = computed(() => props.student.senTypes);

    const houseClassName = computed((): string => {
      switch (house.value) {
        case HOUSE.BLUE:
          return "is-info";
        case HOUSE.GREEN:
          return "is-success";
        case HOUSE.RED:
          return "is-danger";
        case HOUSE.YELLOW:
          return "is-warning";
        default:
          return "";
      }
    });

    const getSenShortname = (senType: string): string => {
      const value = SEN_TYPE[senType as keyof typeof SEN_TYPE];
      switch (value) {
        case SEN_TYPE.SPECIFIC_LEARNING_DIFFICULTIES:
          return "SPLD";
        case SEN_TYPE.INTELLECTUAL_DISABILITY:
          return "ID";
        case SEN_TYPE.AUTISM_SPECTRUM_DISORDERS:
          return "ASD";
        case SEN_TYPE.ATTENTION_DEFICIT_HYPERACTIVITY:
          return "ADHD";
        case SEN_TYPE.PHYSICAL_DISABILITY:
          return "PD";
        case SEN_TYPE.VISUAL_IMPAIRMENT:
          return "VI";
        case SEN_TYPE.HEARING_IMPAIRMENT:
          return "HI";
        case SEN_TYPE.SPEECH_AND_LANGUAGE_IMPAIRMENT:
          return "SLI";
        case SEN_TYPE.MENTAL_ILLNESS:
          return "MI";
        case SEN_TYPE.OTHERS:
          return "Others";
        default:
          return "";
      }
    };

    return {
      regno,
      sex,
      house,
      senTypes,
      houseClassName,
      getSenShortname,
    };
  },
});
</script>
