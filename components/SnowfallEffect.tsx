"use client";
import Snowfall from "react-snowfall";
import { useEffect, useState } from "react";

const SnowfallEffect = () => {
  // const [snowflakes, setSnowflakes] = useState<HTMLImageElement[]>([]);

  // useEffect(() => {
  //   const snowflake1 = document.createElement("img");
  //   snowflake1.src = "/snow.svg";
  //   setSnowflakes([snowflake1]);
  // }, []);

  return (
    <>
      {/* {snowflakes.length > 0 && (
        <Snowfall
          snowflakeCount={200}
          // images={snowflakes}
          radius={[10, 20]}
          speed={[0.5, 2.0]}
        />
      )} */}
      <Snowfall
        snowflakeCount={200}
        // images={snowflakes}
        radius={[2, 6]}
        speed={[0.5, 2.0]}
      />
    </>
  );
};

export default SnowfallEffect;
