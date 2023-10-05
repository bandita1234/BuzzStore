import React from "react";

const Color = (props) => {
  const { colorData, setColor, color } = props;
  // console.log(colorData);
  return (
    <div>
      <ul className="flex flex-wrap">
        {colorData?.length > 0 ? (
          colorData?.map((item, idx) => {
            return (
              <li
                onClick={() => setColor(item?._id)}
                className={`m-1 h-5 w-5 rounded-full ${
                  color == item?._id ? "border-main-color border-2" : ""
                } `}
                style={{
                  backgroundColor: `${item?.title}`,
                  boxShadow: color === item?._id ? "0 0 0 2px #0ec99e" : "none", // Adjust the spread radius (4px in this case)
                }}
                key={idx}
              ></li>
            );
          })
        ) : (
          <li
            onClick={() => setColor("6516c20d1fbfd1aecf4c8d97")}
            className="m-1 h-5 w-5 rounded-full"
            style={{ backgroundColor: "#fff" }}
          ></li>
        )}
      </ul>
    </div>
  );
};

export default Color;
