import React, { useEffect, useState } from "react";
import TransactionalListItem from "../components/shared/TransactionalListItem";
import Modal from "../components/Modal";
import TransactionForm from "../components/TransactionForm";

const DashboardPage = (props) => {
  const [expendModal, setExpendModal] = useState(false);
  const addExpense = () => {
    setExpendModal(true);
  };
  const userOweAmt = () => {
      let amt = 0;
      props.user.transactions.forEach(element => {
          if(element.type == "borrow") {
            amt = parseFloat(amt) + parseFloat(element.amount)
          }
      });
      return amt
  }
  const userOwed = () => {
      let amt = 0;
      props.user.transactions.forEach(element => {
          if(element.type == "lend") {
            amt = parseFloat(amt) + parseFloat(element.amount)
          }
      });
      return amt
  }

  return (
    <>
      <div className="container h-100 no-scroll">
        <section className="transactTop">
          <div className="expenseArea">
            <button className="btn btnAddExpense" onClick={addExpense}>
              Add Expense
            </button>
          </div>
          <div className="settleArea">
            <button
              className="btn btnSettleExpense"
              disabled={props.user?.balance == 0}
            >
              Settle Up
            </button>
          </div>
          <div
            className={
              props.user?.transactions.length > 0
                ? "infoTransacArea withTransactions"
                : "infoTransacArea"
            }
          >
            {props.user?.transactions.length > 0 ? (
              <>
                {console.log(props.user)}
                <article className="infoBalance dashCells">
                  <h6>Total Balance:</h6>
                  <h4>&#8377;{props.user.balance}</h4>
                </article>
                <article className="infoOweAmt dashCells">
                  <h6>You Owe:</h6>
                  <h4>&#8377;{userOweAmt()}</h4>
                </article>
                <article className="infoOwedAmt dashCells">
                  <h6>You are owed:</h6>
                  <h4>&#8377;{userOwed()}</h4>
                </article>
              </>
            ) : (
              <article className="infoBalance">
                <h6>You have no Transactions. Your Balance is:</h6>
                <h4>&#8377;{props.user?.balance}</h4>
              </article>
            )}
          </div>
        </section>
        <section className="statsTransactions"></section>
        <section className="activityTransactions dashCells">
          <div className="colBalances d-flex f-column h-100">
            <header className="headerBalances d-flex f-align-center">
              <h5>Recent Activity</h5>
            </header>
            <div className="colBody f-1">
              {props.user?.transactions.length > 0 ? (
                props.user?.transactions.map((transactionActivity, i) => (
                  <TransactionalListItem
                    transaction={transactionActivity}
                    index={i}
                    key={i}
                  />
                ))
              ) : (
                <div className="noDataFound">No activity found!</div>
              )}
            </div>
          </div>
        </section>
        <section className="userBalances dashCells">
          <article className="colBalances colOwe d-flex f-column">
            <header className="headerBalances d-flex f-justify-between f-align-center">
              <h5>You Owe</h5>

              <div className="sortCol">
                <select defaultValue="null">
                  <option value="null">Sort By</option>
                  <option value="date">Date</option>
                  <option value="alphabetically">Alphabetically</option>
                </select>
              </div>
            </header>

            <div className="colBody f-1">
              {props.user?.transactions.filter(
                (transaction) => transaction.type == "borrow"
              ).length > 0 ? (
                props.user?.transactions
                  .filter((transaction) => transaction.type == "borrow")
                  .map((transaction, i) => (
                    <TransactionalListItem
                      transaction={transaction}
                      index={i}
                      key={i}
                    />
                  ))
              ) : (
                <div className="noDataFound">You owe nothing</div>
              )}
            </div>
          </article>
          <article className="colBalances colOwed d-flex f-column">
            <header className="headerBalances d-flex f-justify-between f-align-center">
              <h5>You Are Owed</h5>

              <div className="sortCol">
                <select defaultValue="null">
                  <option value="null">Sort By</option>
                  <option value="date">Date</option>
                  <option value="alphabetically">Alphabetically</option>
                </select>
              </div>
            </header>

            <div className="colBody f-1">
              {props.user?.transactions.filter(
                (transaction) => transaction.type == "lend"
              ).length > 0 ? (
                props.user?.transactions
                  .filter((transaction) => transaction.type == "lend")
                  .map((transaction, i) => (
                    <TransactionalListItem
                      transaction={transaction}
                      index={i}
                      key={i}
                    />
                  ))
              ) : (
                <div className="noDataFound">You are owed nothing</div>
              )}
            </div>
          </article>
        </section>
      </div>
      {expendModal ? (
        <Modal header="Add Expense" setClose={setExpendModal}>
          <TransactionForm setClose={setExpendModal} />
        </Modal>
      ) : (
        ""
      )}
    </>
  );
};

export default DashboardPage;
