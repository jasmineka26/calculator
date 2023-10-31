import "./App.css";
import calculate from "./Calculate";
import Button from "./components/Button";
import React from "react";
import History from "./components/History";

class App extends React.Component {
  state = {
    monitor: [],
    result: [],
    history: [],
  };

  isOp = (btnTitle) => "()^*-+/".includes(btnTitle);

  onEqualClicked = (btnTitle) => {
    // const result = [...this.state.result];
    const history = [...this.state.history];
    const monitor = [...this.state.monitor];
    if (btnTitle === "=" && monitor[monitor.length - 1] !== "=") {
      let formula = [];
      let num = "";
      let op = "";
      let openParenthesesCount = 0;
      let closeParenthesesCount = 0;

      for (let i = 0; i < this.state.monitor.length; i++) {
        const ch = this.state.monitor[i];
        const isOp = this.isOp(this.state.monitor[i]);
        if (ch === "(") {
          openParenthesesCount++;
        } else if (ch === ")") {
          closeParenthesesCount++;
        }
        if (ch === "Sin" || ch === "Cos") {
          formula.push(ch);
        } else if (!isOp || (ch === "." && num !== "")) {
          num += ch;
        } else {
          if (num !== "") {
            formula.push(num);
          }
          op = ch;
          formula.push(op);
          num = "";
        }
      }

      if (num !== "") {
        formula.push(num);
      }

      if (openParenthesesCount === closeParenthesesCount) {
        const result = [...this.state.result];
        result.push(calculate(formula));
        this.setState({ result });
        history.push({ result, formula: this.state.monitor.join("") });
      } else if (openParenthesesCount !== closeParenthesesCount) {
        const result = [...this.state.result];
        result.push("syntax error");
        this.setState({ result });
      }
      this.setState({ history });
    }

    this.setState({ monitor: [...this.state.monitor, btnTitle] }); // spread operator
  };

  onOperatiClicked = (btnTitle) => {
    const monitor = [...this.state.monitor];
    const lastCh = monitor[monitor.length - 1];
    const beforeLastCh = monitor[monitor.length - 2];
    if ("+-".includes(btnTitle)) {
      if (lastCh === "=") {
        console.log("first");
        monitor[monitor.length - 1] = btnTitle;
        const result = this.state.result;
        this.setState({ monitor: [result, btnTitle] });
        this.setState({ result: [] });
      } else if ("+-".includes(beforeLastCh) && "/*-+".includes(lastCh)) {
        monitor[monitor.length - 1] = btnTitle;
        this.setState({ monitor });
      } else if (
        "+-".includes(btnTitle) &&
        "+-".includes(lastCh) &&
        "*/".includes(beforeLastCh)
      ) {
        monitor[monitor.length - 1] = btnTitle;
        this.setState({ monitor });
      }
    } else if ("*/".includes(btnTitle)) {
      if (lastCh === "=") {
        monitor[monitor.length - 1] = btnTitle;
        const result = this.state.result;
        this.setState({ monitor: [result, btnTitle] });
        this.setState({ result: [] });
      } else if ("-+".includes(lastCh) && "+-*/".includes(beforeLastCh)) {
        monitor[monitor.length - 1] = "";
        monitor[monitor.length - 2] = btnTitle;
        this.setState({ monitor });
      } else if ("*/".includes(lastCh) || "-+".includes(lastCh)) {
        monitor[monitor.length - 1] = btnTitle;
        this.setState({ monitor });
      }
    } else if (btnTitle === "=" && lastCh === "=") {
      monitor[monitor.length - 1] = btnTitle;
      this.setState({ monitor });
    }
  };

  onClearBtnClicked = () => {
    this.setState({ monitor: [] });
    this.setState({ result: [] });
  };

  onDeleteBtnClicked = () => {
    const monitor = [...this.state.monitor];
    if (monitor.length > 0) {
      monitor.pop();
      this.setState({ monitor });
      this.setState({ result: [] });
    }
  };

  onClearHistoryClicked = () => {
    this.setState({ history: [] });
  };

  render() {
    return (
      <div className="gap-6 flex flex-col bg-slate-900 items-center justify-start w-screen h-screen overflow-auto">
        <div className="flex flex-row justify-center items-center gap-6">
          <div className="h-screen text-white flex justify-center items-center shadow-lg">
            <div className="bg-slate-700 rounded shadow-lg h-[500px] w-[400px] flex flex-col justify-start items-center gap-2 p-8">
              <div
                className={`h-36 w-full bg-gray-800 text-blue-400 text-lg p-5 text-left outline-none rounded-md hover:outline-orange-500 overflow-auto `}
              >
                {this.state.monitor.join("")}
                <div
                  className={`w-full bg-gray-800 text-green-500 text-2xl font-bold pt-4 text-right outline-none rounded-md `}
                >
                  {this.state.result.join("")}
                </div>
              </div>
              <div className="flex flex-row space-x-[23px] items-center pt-2">
                <Button
                  title="("
                  color="rgb(59 130 246)"
                  onClick={this.onEqualClicked}
                />
                <Button
                  title=")"
                  color="rgb(59 130 246)"
                  onClick={this.onEqualClicked}
                />
                <Button
                  title="Sin"
                  color="rgb(59 130 246)"
                  onClick={this.onEqualClicked}
                />
                <Button
                  title="DEL"
                  color="rgb(59 130 246)"
                  onClick={this.onDeleteBtnClicked}
                />
                <Button
                  title="CLR"
                  color="rgb(59 130 246)"
                  onClick={this.onClearBtnClicked}
                />
              </div>
              <div className="flex flex-row space-x-[23px] items-center pt-2">
                <Button title="7" onClick={this.onEqualClicked} />
                <Button title="8" onClick={this.onEqualClicked} />
                <Button title="9" onClick={this.onEqualClicked} />
                <Button
                  title="Cos"
                  color="rgb(59 130 246)"
                  onClick={this.onEqualClicked}
                />
                <Button
                  title="%"
                  color="rgb(59 130 246)"
                  onClick={this.onEqualClicked}
                />
              </div>
              <div className="flex flex-row space-x-[23px] items-center pt-2">
                <Button title="4" onClick={this.onEqualClicked} />
                <Button title="5" onClick={this.onEqualClicked} />
                <Button title="6" onClick={this.onEqualClicked} />
                <Button
                  title="*"
                  color="rgb(59 130 246)"
                  onClick={this.onEqualClicked}
                  operation={this.onOperatiClicked}
                />
                <Button
                  title="/"
                  color="rgb(59 130 246)"
                  onClick={this.onEqualClicked}
                  operation={this.onOperatiClicked}
                />
              </div>
              <div className="flex flex-row space-x-[23px] items-center pt-2">
                <Button title="1" onClick={this.onEqualClicked} />
                <Button title="2" onClick={this.onEqualClicked} />
                <Button title="3" onClick={this.onEqualClicked} />
                <Button
                  title="+"
                  color="rgb(59 130 246)"
                  onClick={this.onEqualClicked}
                  operation={this.onOperatiClicked}
                />
                <Button
                  title="-"
                  color="rgb(59 130 246)"
                  onClick={this.onEqualClicked}
                  operation={this.onOperatiClicked}
                />
              </div>
              <div className="flex flex-row space-x-[23px] items-center pt-2">
                <Button title="^" onClick={this.onEqualClicked} />
                <Button title="0" onClick={this.onEqualClicked} />
                <Button title="." onClick={this.onEqualClicked} />
                <Button
                  title="="
                  onClick={this.onEqualClicked}
                  size="120px"
                  color="rgb(248 113 113)"
                  operation={this.onOperatiClicked}
                />
                {/* <button className="rounded bg-red-400 text-white text-[30px] w-[122px] h-12 hover:scale-110">
              =
            </button> */}
              </div>
            </div>
          </div>
          <div className="bg-slate-500/70 w-64 h-96 hover:bg-green-800 rounded-lg border-2">
            <History
              title={"clear"}
              onClick={this.onClearHistoryClicked}
              historyMonitor={this.state.history}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
