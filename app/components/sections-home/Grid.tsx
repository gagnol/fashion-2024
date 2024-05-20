"use client"
import { gridItems } from "@/data";
import { BentoGrid, BentoGridItem } from "./BentoGrid";

const Grid = () => {
  return (
    <div className="max-w-screen-2xl mx-auto py-2 overflow-x-hidden">
      <BentoGrid className="w-full py-20">
        {gridItems.map((item, i) => (
          <BentoGridItem
            id={item.id}
            key={i}
            title={item.title}
            description={item.description}
            // remove icon prop
            // remove original classname condition
            className={item.className}
            img={item.img}
            imgClassName={item.imgClassName}
            titleClassName={item.titleClassName}
            spareImg={item.spareImg}
          />
        ))}
      </BentoGrid>
    </div>
  );
};

export default Grid;
