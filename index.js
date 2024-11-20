const express = require('express');
const { resolve } = require('path');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());

// Endpoint 1: Calculate the Returns of the Stocks added
function calculateReturnStocks(boughtAt, marketPrice, quantity) {
  let result = (marketPrice - boughtAt) * quantity;
  return result.toString();
}

app.get('/calculate-returns', function (req, res) {
  let boughtAt = parseFloat(req.query?.boughtAt);
  let marketPrice = parseFloat(req.query?.marketPrice);
  let quantity = parseFloat(req.query?.quantity);

  res.send(calculateReturnStocks(boughtAt, marketPrice, quantity));
});

// Endpoint 2: Calculate the Total Returns
function calculateTotalReturns(...stocks) {
  let totalReturns = 0;
  for (let stock in stocks) {
    totalReturns += stocks[stock];
  }
  return totalReturns.toString();
}

app.get('/total-returns', (req, res) => {
  let stock1 = parseFloat(req.query?.stock1);
  let stock2 = parseFloat(req.query?.stock2);
  let stock3 = parseFloat(req.query?.stock3);
  let stock4 = parseFloat(req.query?.stock4);

  res.send(calculateTotalReturns(stock1, stock2, stock3, stock4));
});

// Endpoint 3: Calculate the Return Percentage
function calculateReturnPercentage(boughtAt, returns) {
  let returnPercentage = (returns / boughtAt) * 100;
  return returnPercentage.toString();
}

app.get('/calculate-return-percentage', (req, res) => {
  let boughtAt = parseFloat(req.query?.boughtAt);
  let returns = parseFloat(req.query?.returns);

  res.send(calculateReturnPercentage(boughtAt, returns));
});

// Endpoint 4: Calculate the Total Return Percentage
function calculateTotalReturnPercentage(...stocks) {
  let totalReturns = 0;
  for (let stock in stocks) {
    totalReturns += stocks[stock];
  }
  return totalReturns.toString();
}

app.get('/total-return-percentage', function (req, res) {
  let stock1 = parseFloat(req.query?.stock1);
  let stock2 = parseFloat(req.query?.stock2);
  let stock3 = parseFloat(req.query?.stock3);
  let stock4 = parseFloat(req.query?.stock4);

  res.send(calculateTotalReturnPercentage(stock1, stock2, stock3, stock4));
});

// Endpoint 5: Identify the Status of Stocks based on their Return Value
function identifyStatusOfStocks(returnPercentage) {
  let result = 'Loss';
  if (returnPercentage > 0) {
    result = 'Profit';
  }
  return result;
}

app.get('/status', (req, res) => {
  let returnPercentage = parseFloat(req.query?.returnPercentage);
  res.send(identifyStatusOfStocks(returnPercentage));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
