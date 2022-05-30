import React, { useEffect, useState } from "react";
import authData from "../borrowmoreData.json";

const TransactionForm = (props) => {
  const [userData, setUserData] = useState([]);
  const [presentUser, setPresenetUser] = useState("null");
  const [transactionData, setTransactionData] = useState({
    user: "",
    type: "",
    date: "",
    reason: "",
    amount: 0,
  });
  const [transactionErrors, setTransactionErrors] = useState({
    user: "",
    type: "",
    date: "",
    reason: "",
    amount: "",
  });

  const confirmTransaction = (e) => {
    e.preventDefault();

    if (!transactionData.user) {
      setTransactionErrors({
        ...transactionErrors,
        user: "Please select a Loaner / Loanee",
      });
    }

    if (transactionData.type.trim() === "") {
      setTransactionErrors({
        ...transactionErrors,
        type: "Please select a method of transaction",
      });
    }

    if (transactionData.reason.trim() === "") {
      setTransactionErrors({
        ...transactionErrors,
        reason: "Please write a note on why the transaction is necessary",
      });
    }

    if (
      transactionData.user &&
      transactionData.type.trim() !== "" &&
      transactionData.reason.trim() !== "" &&
      transactionData.amount !== 0
    ) {
      let transactionDataSet = { ...transactionData };
      let today = new Date();
      let dd = String(today.getDate()).padStart(2, "0");
      let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
      let yyyy = today.getFullYear();

      today = mm + "/" + dd + "/" + yyyy;

      transactionDataSet.date = today;
      setTransactionErrors({
        user: "",
        type: "",
        date: "",
        reason: "",
      });

      let updatedUserData = {
        ...presentUser,
        transactions: [...presentUser.transactions, transactionDataSet],
        balance:
          transactionData.type == "borrow"
            ? parseFloat(presentUser.balance) +
              parseFloat(transactionData.amount)
            : parseFloat(presentUser.balance) -
              parseFloat(transactionData.amount),
      };
      window.localStorage.setItem("user", JSON.stringify(updatedUserData));
      props.setClose(false);
    }
  };

  const setUser = (e) => {
    if (e.target.value != "null") {
      setTransactionData({
        ...transactionData,
        user: userData.filter((user) => user.email == e.target.value)[0],
      });
      setTransactionErrors({
        ...transactionErrors,
        user: "",
      });
    } else {
      setTransactionData({
        ...transactionData,
        user: "",
      });
      setTransactionErrors({
        ...transactionErrors,
        user: "Please select a Loaner / Loanee",
      });
    }
  };

  const setTransactionType = (e) => {
    if (e.target.value == "null") {
      setTransactionErrors({
        ...transactionErrors,
        type: "Please select a method of transaction",
      });
      setTransactionData({
        ...transactionData,
        type: "",
      });
    } else {
      setTransactionData({
        ...transactionData,
        type: e.target.value,
      });
      setTransactionErrors({
        ...transactionErrors,
        type: "",
      });
    }
  };

  const setTransactionAmt = (e) => {
    if (e.target.value.trim() == "" || e.target.value == 0) {
      setTransactionErrors({
        ...transactionErrors,
        amount: "Please enter a valid amount",
      });
      setTransactionData({
        ...transactionData,
        amount: "",
      });
    } else {
      if (transactionData.type == "borrow") {
        if (e.target.value > transactionData.user.balance) {
          setTransactionErrors({
            ...transactionErrors,
            amount: "Borrow amount is more than user balance",
          });
          setTransactionData({
            ...transactionData,
            amount: "",
          });
        } else {
          setTransactionData({
            ...transactionData,
            amount: e.target.value,
          });
          setTransactionErrors({
            ...transactionErrors,
            amount: "",
          });
        }
      }
      if (transactionData.type == "lend") {
        if (e.target.value > presentUser.balance) {
          setTransactionErrors({
            ...transactionErrors,
            amount: "Lending amount is more than user balance",
          });
          setTransactionData({
            ...transactionData,
            amount: "",
          });
        } else {
          setTransactionData({
            ...transactionData,
            amount: e.target.value,
          });
          setTransactionErrors({
            ...transactionErrors,
            amount: "",
          });
        }
      }
    }
  };

  useEffect(() => {
    setPresenetUser(JSON.parse(window.localStorage.getItem("user")));
    setUserData(authData);
  }, []);
  return (
    <form className="formTransaction" onSubmit={confirmTransaction}>
      <div
        className={
          transactionErrors.user !== ""
            ? "formGroup d-flex error"
            : "formGroup d-flex"
        }
      >
        <label>Loaner / Loanee</label>
        <div className="formRow f-1">
          <select defaultValue="null" onChange={(e) => setUser(e)}>
            <option value="null">Select</option>
            {userData
              .filter(
                (user) => user.email !== presentUser.email && user.balance > 0
              )
              .map((users, i) => (
                <option value={users.email} key={i}>
                  {users.user}
                </option>
              ))}
          </select>
          {transactionErrors.user !== "" ? (
            <p className="errorMsg">{transactionErrors.user}</p>
          ) : (
            ""
          )}
        </div>
      </div>
      <div
        className={
          transactionErrors.type !== ""
            ? "formGroup d-flex error"
            : "formGroup d-flex"
        }
      >
        <label>Type</label>
        <div className="formRow f-1">
          <select defaultValue="null" onChange={(e) => setTransactionType(e)}>
            <option value="null">Select</option>
            <option value="borrow">Borrow</option>
            <option value="lend">Lend</option>
          </select>
          {transactionErrors.type !== "" ? (
            <p className="errorMsg">{transactionErrors.type}</p>
          ) : (
            ""
          )}
        </div>
      </div>
      <div
        className={
          transactionErrors.amount !== ""
            ? "formGroup d-flex error"
            : "formGroup d-flex"
        }
      >
        <label>Amount</label>
        <div className="formRow f-1">
          <input
            type="number"
            placeholder="Enter amount"
            onChange={setTransactionAmt}
          />
          {transactionErrors.amount !== "" ? (
            <p className="errorMsg">{transactionErrors.amount}</p>
          ) : (
            ""
          )}
        </div>
      </div>
      <div
        className={
          transactionErrors.reason !== ""
            ? "formGroup d-flex error"
            : "formGroup d-flex"
        }
      >
        <label>Reason</label>
        <div className="formRow f-1">
          <textarea
            placeholder="Reason of trasnsaction"
            onChange={(e) =>
              setTransactionData({
                ...transactionData,
                reason: e.target.value.trim() !== "" ? e.target.value : "",
              })
            }
          ></textarea>
          {transactionErrors.reason !== "" ? (
            <p className="errorMsg">{transactionErrors.reason}</p>
          ) : (
            ""
          )}
        </div>
      </div>
      <footer className="formGroup formFooter text-center">
        <button className="btn btnConfirmTransaction" type="submit">
          Confirm
        </button>
      </footer>
    </form>
  );
};

export default TransactionForm;
