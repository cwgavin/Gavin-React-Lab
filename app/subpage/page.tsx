"use client";
import React from "react";
import Input from "./input-component";
import FruitsSection, { Fruit } from "./fruits-component";
import { dummyData } from "./dummyData";

export default function Home() {
  const [fruits, setFruits] = React.useState<Fruit[]>([]);
  const [filteredFruits, setFilteredFruits] = React.useState<Fruit[]>([]);

  React.useEffect(() => {
    // fetch(
    //   "https://cors-anywhere.herokuapp.com/https://www.fruityvice.com/api/fruit/all",
    //   {
    //     headers: {
    //       Origin: "localhost",
    //     },
    //   }
    // )
    //   .then((res) => res.json())
    //   .then((json: Fruit[]) => {
    //     setFruits(json);
    //     setFilteredFruits(json);
    //   })
    //   .catch((err) => console.log(err));
    setFruits(dummyData);
    setFilteredFruits(dummyData);
  }, []);

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = event.target.value.toLowerCase();
    const newFilteredFruits = fruits.filter((fruit) =>
      fruit.name.toLowerCase().includes(searchValue)
    );
    setFilteredFruits(newFilteredFruits);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Input placeholder="Search fruits..." onChangeHandler={onChangeHandler} />
      <FruitsSection fruits={filteredFruits} />
    </main>
  );
}
