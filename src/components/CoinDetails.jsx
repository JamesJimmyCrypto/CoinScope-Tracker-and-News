import millify from "millify";
import React, { useEffect, useState, useContext } from "react";
import { CryptoCurrency } from "../context/CryptoCurrencyContext";

const CoinDetails = ({ coinId }) => {
  const [coinData, setCoinData] = useState(null);

  const fetchCoinDetails = async () => {
    try {
      const res = await fetch(
        `https://api.coinranking.com/v2/coin/${coinId}?referenceCurrencyUuid=${currencyRefId}`
      );
      const data = await res.json();
      setCoinData(data);
    } catch (error) {
      console.error(error);
    }
  };

  const { currency, symbol, currencyRefId, changeToInr, changeToUsd, user } =
    useContext(CryptoCurrency);

  useEffect(() => {
    fetchCoinDetails();
  }, [coinId, currency]);

  if (!coinData)
    return (
      <div className="flex items-center justify-center w-full lg:w-1/3 min-h-[400px]">
        <span className="loading loading-ring loading-lg bg-[#faed26]"></span>
      </div>
    );

  return (
    <div className="card w-full lg:w-1/3 max-w-md ">
      <div className="flex gap-4 justify-center md:justify-start">
        <button
          onClick={changeToUsd}
          className={`py-3 px-6 rounded shadow-md hover:scale-105 transition ${
            currency === "USD" ? "bg-[#faed26] text-[#121111]" : "bg-base-100"
          }`}
        >
          USD
        </button>
        <button
          onClick={changeToInr}
          className={`py-3 px-6 rounded shadow-md hover:scale-105 transition ${
            currency === "INR" ? "bg-[#faed26] text-[#121111]" : "bg-base-100"
          }`}
        >
          INR
        </button>
      </div>
      <figure className="px-4 md:px-8 pt-6 md:pt-10">
        <img
          src={coinData.data.coin.iconUrl}
          alt={coinData.data.coin.name}
          className="h-32 md:h-48 lg:h-56 w-auto object-contain"
        />
      </figure>
      <div className="card-body items-center text-center px-4 md:px-8">
        <h2 className="card-title uppercase text-xl md:text-2xl lg:text-3xl font-extrabold">
          {coinData.data.coin.name}
        </h2>
        <p className="text-sm md:text-base mt-2 mb-4">
          {coinData.data.coin.description}
        </p>
        <div className="space-y-3 w-full">
          <p className="text-lg md:text-xl font-bold flex justify-between">
            <span>Price:</span>
            <span>
              {" "}
              {symbol} {millify(coinData.data.coin.price)}
            </span>
          </p>
          <p className="text-lg md:text-xl font-bold flex justify-between">
            <span>Rank:</span>
            <span>{coinData.data.coin.rank}</span>
          </p>
          <p className="text-lg md:text-xl font-bold flex justify-between">
            <span>Market Cap:</span>
            <span>
              {" "}
              {symbol} {millify(coinData.data.coin.marketCap)}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CoinDetails;
