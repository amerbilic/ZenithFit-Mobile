import { LOAD_GOAL_PRODUCTS } from "../actions/goals";

const initialState = {
  goalProducts: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOAD_GOAL_PRODUCTS:
      state.goalProducts = action.goalProducts;
      return state;
    default:
      return state;
  }
};

export const genderList = [
  {
    title: "Male",
    imageUrl: "https://s3.envato.com/files/280829887/LSTR9828.jpg",
    id: 1,
    linkUrl: "/goals/male",
  },
  {
    title: "Female",
    imageUrl:
      "https://media.self.com/photos/5b52046f18a2407a16eba501/4:3/w_2560%2Cc_limit/woman-lifting-dumbbells.jpg",
    id: 2,
    linkUrl: "/goals/female",
  },
];
export const goalsItems = [
  {
    title: "Build Muscle",
    imageUrl:
      "https://img.freepik.com/free-photo/young-fitness-man-studio_7502-5008.jpg?size=626&ext=jpg&ga=GA1.2.2003212417.1626566400",
    id: 1,
    linkUrl: "build_muscle",
  },
  {
    title: "Lose Weight",
    imageUrl:
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8Zml0bmVzc3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80",
    id: 2,
    linkUrl: "lose_weight",
  },
  {
    title: "Improve Performance",
    imageUrl:
      "https://evofitness.ch/wp-content/uploads/2019/06/Battle-ropes-Cordes-ondulatoires-EVO-Fitness-1200x675.jpg",
    id: 3,
    linkUrl: "improve_performance",
  },
  {
    title: "Tone up",
    imageUrl:
      "https://st2.depositphotos.com/2146559/7622/i/600/depositphotos_76223801-stock-photo-woman-runner-stretching-legs.jpg",
    size: "large",
    id: 4,
    linkUrl: "tone_up",
  },
];
