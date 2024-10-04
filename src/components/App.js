import { useEffect, useReducer } from "react";

import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import NextButton from "./NextButton";
import Progress from "./Progress";
import FinishScreen from "./FinishScreen";
import Footer from "./Footer";
import Timer from "./Timer";
import "../index.css";

const SECS_PER_QUESTION = 20;

const initialState = {
  questions: [], // We'll define this directly below
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemaining: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      };
    case "start":
      return {
        ...state,
        status: "active",
        secondsRemaining: state.questions.length * SECS_PER_QUESTION,
      };
    case "newAnswer":
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };
    case "finish":
      return {
        ...state,
        status: "finished",
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };
    case "restart":
      return { ...initialState, questions: state.questions, status: "ready" };
    case "tick":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finished" : state.status,
      };
    default:
      throw new Error("Action unknown");
  }
}

export default function App() {
  const [
    { questions, status, index, answer, points, highscore, secondsRemaining },
    dispatch,
  ] = useReducer(reducer, initialState);

  const numQuestions = questions.length;
  const maxPossiblePoints = questions.reduce(
    (prev, cur) => prev + cur.points,
    0
  );

  // Hardcoded questions directly in the code
  useEffect(function () {
    const hardcodedQuestions = [
      {
        id: 1,
        question: "What does PACE in NASA's PACE satellite stand for?",
        options: [
          "Planetary Atmosphere Climate Experiment",
          "Plankton, Aerosol, Cloud, ocean Ecosystem",
          "Polar Atmospheric Cloud Exploration",
          "Plasma and Cosmic Energy",
        ],
        correctOption: 1,
        points: 10,
      },
      {
        id: 2,
        question: "What is the primary mission of NASA's PACE satellite?",
        options: [
          "To explore the outer solar system",
          "To monitor Earth’s oceans and atmosphere",
          "To study the surface of Mars",
          "To map the Milky Way galaxy",
        ],
        correctOption: 1,
        points: 15,
      },
      {
        id: 3,
        question: "Which type of data is primarily collected by PACE?",
        options: [
          "Ocean color, aerosols, and clouds",
          "Geological activity on planets",
          "Solar wind and cosmic rays",
          "Gravitational waves",
        ],
        correctOption: 0,
        points: 10,
      },
      {
        id: 4,
        question: "Which type of ecosystem is a key focus of PACE?",
        options: [
          "Terrestrial forests",
          "Ocean ecosystems",
          "Desert biomes",
          "Mountain ecosystems",
        ],
        correctOption: 1,
        points: 5,
      },
      {
        id: 5,
        question: "What is one of PACE's contributions to understanding climate change?",
        options: [
          "Detecting new planets in other galaxies",
          "Studying changes in plankton and ocean health",
          "Observing volcanic activity",
          "Tracking tectonic shifts",
        ],
        correctOption: 1,
        points: 15,
      },
      {
        id: 6,
        question: "What will PACE's hyperspectral radiometer help scientists monitor?",
        options: [
          "Ozone layer depletion",
          "Biodiversity on land",
          "Phytoplankton and marine biology",
          "The moon's surface",
        ],
        correctOption: 2,
        points: 10,
      },
      {
        id: 7,
        question: "PACE will provide data to help improve predictions of which global issue?",
        options: [
          "Earthquakes",
          "Hurricanes",
          "Air quality and climate change",
          "Solar flares",
        ],
        correctOption: 2,
        points: 10,
      },
      {
        id: 8,
        question: "Which specific part of the Earth system does PACE study?",
        options: [
          "Earth's core",
          "Ocean and atmosphere",
          "Mountains and rivers",
          "Earth's tectonic plates",
        ],
        correctOption: 1,
        points: 5,
      },
      {
        id: 9,
        question: "When was NASA's PACE satellite expected to launch?",
        options: ["2021", "2022", "2023", "2024"],
        correctOption: 3,
        points: 5,
      },
      {
        id: 10,
        question: "Which of the following will PACE NOT study?",
        options: [
          "Marine phytoplankton",
          "Ocean color",
          "Lunar surface",
          "Aerosols in the atmosphere",
        ],
        correctOption: 2,
        points: 10,
      },
      {
        id: 11,
        question: "What wavelength ranges will PACE's instruments cover?",
        options: [
          "Ultraviolet to shortwave infrared",
          "X-rays and gamma rays",
          "Radio waves",
          "Infrared only",
        ],
        correctOption: 0,
        points: 10,
      },
      {
        id: 12,
        question: "Why are aerosols important in climate science, as studied by PACE?",
        options: [
          "They reflect and absorb sunlight, affecting temperature",
          "They increase the number of hurricanes",
          "They help in the formation of tectonic plates",
          "They stabilize weather patterns",
        ],
        correctOption: 0,
        points: 15,
      },
      {
        id: 13,
        question: "What key aspect of the ocean does PACE monitor to assess the health of marine ecosystems?",
        options: [
          "Ocean color and phytoplankton",
          "Sea level rise",
          "Ocean currents",
          "Deep sea tectonic activity",
        ],
        correctOption: 0,
        points: 10,
      },
      {
        id: 14,
        question: "PACE's observations will help improve forecasts of what?",
        options: [
          "Coral bleaching events",
          "Land erosion rates",
          "Rainforest depletion",
          "Space weather",
        ],
        correctOption: 0,
        points: 5,
      },
      {
        id: 15,
        question: "Which of the following is a key challenge PACE aims to address?",
        options: [
          "Understanding human impacts on ocean ecosystems",
          "Studying lunar geology",
          "Mapping the asteroid belt",
          "Monitoring volcanic eruptions",
        ],
        correctOption: 0,
        points: 10,
      },
    ];
    

    dispatch({
      type: "dataReceived",
      payload: hardcodedQuestions,
    });
  }, []);

  return (
    <div className="wrapper">
      <div className="app">
        <div className="headerWrapper">
          <Header />

          <Main>
            {status === "loading" && <Loader />}
            {status === "error" && <Error />}
            {status === "ready" && (
              <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
            )}
            {status === "active" && (
              <>
                <Progress
                  index={index}
                  numQuestions={numQuestions}
                  points={points}
                  maxPossiblePoints={maxPossiblePoints}
                  answer={answer}
                />
                <Question
                  question={questions[index]}
                  dispatch={dispatch}
                  answer={answer}
                />
                <Footer>
                  <Timer
                    dispatch={dispatch}
                    secondsRemaining={secondsRemaining}
                  />
                  <NextButton
                    dispatch={dispatch}
                    answer={answer}
                    numQuestions={numQuestions}
                    index={index}
                  />
                </Footer>
              </>
            )}
            {status === "finished" && (
              <FinishScreen
                points={points}
                maxPossiblePoints={maxPossiblePoints}
                highscore={highscore}
                dispatch={dispatch}
              />
            )}
          </Main>
        </div>
      </div>
    </div>
  );
}
