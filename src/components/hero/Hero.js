import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
// import HeroQuiz from "./heroQuiz/HeroQuiz";
// import List from "./list/List";
import { Progress } from "antd";
import "../../stylesheet/hero/hero.css";
import { Data } from "../data/Data";

class Hero extends React.Component {
  constructor(props) {
    super(props);
    // Component
  }
  state = {
    round: 0,
    currentQuestion: 0,
    introvertCounter: 1,
    extravertCounter: 1,
    showResult: false,
    history: [],
    showButtons: true,
    questions: Data,
  };
  nextQuestion = (isCorrect) => {
    if (isCorrect === true) {
      this.setState((state) => ({
        introvertCounter: state.introvertCounter + 1,
      }));
    } else {
      this.setState((state) => ({
        extravertCounter: state.extravertCounter + 1,
      }));
    }
    const nextQuestion = this.state.currentQuestion + 1;
    if (nextQuestion < this.state.questions.length) {
      this.setState((state) => ({
        currentQuestion: (state.currentQuestion = nextQuestion),
      }));
    } else {
      this.setState((state) => ({
        showResult: (state.showResult = true),
      }));
    }

    this.state.history.push(
      this.state.questions[this.state.currentQuestion].id
    );
    this.state.questions.map((item) => {
      this.state.history.map((item2) => {
        if (item.id == item2) {
          document.getElementById(`${item.id}`).style.backgroundColor = "green";
          document.getElementById(`${item.id}`).style.color = "white";
        }
      });
    });
  };

  prevQuestion = () => {
    const prevQuestion = this.state.currentQuestion - 1;

    this.setState((state) => ({
      currentQuestion: (state.currentQuestion = prevQuestion),
    }));
  };

  componentWillMount = () => {
    document.addEventListener("keydown", (e) => {
      const keyName = e.keyCode;
      if (keyName === 37) {
        if (this.state.currentQuestion > 0) {
          this.prevQuestion();
        }
      } else if (keyName == 39) {
        this.nextQuestion();
      }
    });
  };
  renderShowResult = () => {
    const introvert = this.state.introvertCounter;
    const extravert = this.state.extravertCounter;

    if (introvert >= extravert) {
      return (
        <>
          <p>u are introvert</p>
        </>
      );
    } else {
      return (
        <>
          <p>u are extravert</p>
        </>
      );
    }
  };
  rendeHero = () => {
    const username = localStorage.getItem("username");
    const renderPercent = Math.round(
      (this.state.currentQuestion / this.state.questions.length) * 100
    );
    if (username == "" || !username) {
      this.props.history.push("/");
    } else {
      return (
        <>
          <div className="flex">
            <div className="list-container">
              <ul>
                {this.state.questions.map((item) => {
                  return (
                    <>
                      <li
                        onClick={() => {
                          this.setState((state) => ({
                            currentQuestion: (state.currentQuestion = +(+item.id)),
                          }));
                          this.state.questions.map((item2) => {
                            if (item2.id < +item.id) {
                              document.getElementById(
                                `${item2.id}`
                              ).style.backgroundColor = "gray";
                            }
                          });
                          this.state.history.map((item2) => {
                            document.getElementById(
                              `${+item2}`
                            ).style.backgroundColor = "green";
                          });
                        }}
                        id={item.id}
                      >
                        {item.question}
                      </li>
                    </>
                  );
                })}
              </ul>
            </div>
            <div className="container">
              <div className="h-full full-display-flex">
                <div
                  className="relative box max-w-full"
                  style={{ width: "700px", height: "362px" }}
                >
                  {this.state.showResult ? (
                    <>{this.renderShowResult()}</>
                  ) : (
                    <>
                      {this.state.currentQuestion > 0 && (
                        <div className="back-component">
                          <span onClick={this.state.backHandle}>← Back</span>
                        </div>
                      )}
                      <div className="box-content max-w-full">
                        <div style={{ marginBottom: "1rem" }}></div>
                        <Progress percent={renderPercent} status="active" />
                        <div aria-label="Question Length" className="mt-3">
                          <span className="questionLength-span">
                            {`Question ${this.state.currentQuestion}/${this.state.questions.length}`}
                          </span>
                        </div>
                        <div aria-label="Question" className="mt-3">
                          <span className="question-span">
                            {
                              this.state.questions[this.state.currentQuestion]
                                .question
                            }
                          </span>
                        </div>
                        <div
                          role="button"
                          className="mt-6 questionContainer-button"
                        >
                          {this.state.showButtons && (
                            <>
                              {this.state.questions[
                                this.state.currentQuestion
                              ].answerOptions.map((item) => {
                                return (
                                  <>
                                    <button
                                      type="submit"
                                      className="question-button button-primary h-70"
                                      onClick={() =>
                                        this.nextQuestion(item.isIntrovert)
                                      }
                                    >
                                      {item.answerText}
                                    </button>
                                  </>
                                );
                              })}
                            </>
                          )}
                          {!this.state.showButtons && <p>gggg</p>}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      );
    }
  };

  render() {
    return <>{this.rendeHero()}</>;
  }
}

export default withRouter(Hero);
