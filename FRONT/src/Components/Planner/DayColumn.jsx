import React from "react";
import { Box, Typography } from "@mui/material";
import MealArea from "./MealArea";

const DayColumn = ({ day, date, plannedRecipes, moveRecipe, isToday }) => {
  return (
    <Box display="flex" flexDirection="column" className="day-column">
      <Typography
        variant="h6"
        gutterBottom
        className={`day-title ${isToday ? "today" : ""}`}
      >
        {day} {date.date()}
      </Typography>
      <Box flex="1">
        <MealArea
          title="Desayuno"
          date={date}
          plannedRecipe={plannedRecipes?.Desayuno}
          moveRecipe={moveRecipe}
        />
        <MealArea
          title="Almuerzo"
          date={date}
          plannedRecipe={plannedRecipes?.Almuerzo}
          moveRecipe={moveRecipe}
        />
        <MealArea
          title="Merienda"
          date={date}
          plannedRecipe={plannedRecipes?.Merienda}
          moveRecipe={moveRecipe}
        />
        <MealArea
          title="Cena"
          date={date}
          plannedRecipe={plannedRecipes?.Cena}
          moveRecipe={moveRecipe}
        />
      </Box>
    </Box>
  );
};

export default DayColumn;
