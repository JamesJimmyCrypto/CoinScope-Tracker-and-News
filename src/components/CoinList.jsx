import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import millify from "millify";
import Pagination from "./Pagination";

const CoinList = () => {
  const [coinList, setCoinList] = useState([]);
  const [filteredCoinList, setFilteredCoinList] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [elementsPerPage] = useState(9);

  const lastElement = currentPage * elementsPerPage;
  const firstElement = lastElement - elementsPerPage;

  const currentList = filteredCoinList.slice(firstElement, lastElement);

  const fetchCoinList = async () => {
    try {
      const res = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=99&page=1&sparkline=false`
      );

      const data = await res.json();

      setCoinList(data);
    } catch (error) {
      console.error(error);
    }
  };

  const paginate = (pageNo) => setCurrentPage(pageNo);

  useEffect(() => {
    fetchCoinList();
  }, []);

  useEffect(() => {
    const searchTerm = search.toLowerCase().trim();
    if (!searchTerm) {
      setFilteredCoinList(coinList);
      return;
    }

    const filtered = coinList.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search) ||
        coin.symbol.toLowerCase().includes(search)
    );
    setFilteredCoinList(filtered);
  }, [search, coinList]);

  return (
    <>
      <div className="flex items-center justify-center p-3">
        <input
          type="text"
          className="bg-base-100 w-2/3 p-3 outline-none rounded-lg"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search cryptocurrencies"
        />
      </div>
      <div className="flex items-center justify-center">
        {currentList.length ? (
          <div className="grid gap-4 md:grid-cols-3 md:grid-rows-3 sm:grid-cols-2 p-4">
            {currentList.map((coin) => (
              <Link key={coin.id}>
                <div className="card card-side bg-base-100 shadow-xl px-4">
                  <figure>
                    <img src={coin.image} className="h-12" />
                  </figure>
                  <div className="card-body">
                    <h1 className="card-title">
                      {" "}
                      {coin.market_cap_rank}. {coin.symbol.toUpperCase()}
                    </h1>
                    <p> Price: {millify(coin.current_price)} </p>
                    <p> Market cap: {millify(coin.market_cap)} </p>
                    <p>
                      24h change:
                      <span
                        className={
                          coin.price_change_percentage_24h > 0
                            ? "text-lime-500"
                            : "text-red-600"
                        }
                      >
                        {" "}
                        {coin.price_change_percentage_24h.toFixed(2)}%
                      </span>
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <span className="loading loading-ring loading-lg bg-[#faed26] h-screen"></span>
        )}
      </div>
      <Pagination
        elementsPerPage={elementsPerPage}
        totalElements={filteredCoinList.length}
        paginate={paginate}
      />
    </>
  );
};

export default CoinList;
