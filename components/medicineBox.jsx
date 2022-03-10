import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faSun, faMoon } from "@fortawesome/free-solid-svg-icons";

const trash = {
  icon: faTrashAlt,
  label: "trash",
};

const sun = {
  icon: faSun,
  label: "sun",
};

const moon = {
  icon: faMoon,
  label: "moon",
};

const StyledH2 = styled.h2`
  color: var(--color-two);
  font-family: var(--heading-font);
  margin: 0;
  text-align: center;
  font-size: 1.7rem;
  border-bottom: 1px solid var(--color-one);
  display: inline-block;
`;

const StyledDiv = styled.div`
  border: 3px solid var(--color-one);
  text-align: center;
`;

const StyledList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`;

const Box = styled.li`
  background: var(--color-one);
  margin: 1rem;
  padding: 10px;
  border-radius: 5px;
  color: white;
  ${(props) => props.isNight && `background: var(--color-three);`}
`;

const StyledHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  font-size: 1rem;
`;

const StyledTitle = styled.h3`
  font-family: var(--heading-font);
`;

const StyledIcons = styled.div`
  display: flex;
  flex-direction: row;
`;

const StyledInfo = styled.div`
  text-align: left;
  font-size: 1rem;
  font-family: var(--body-font);
  padding: 0;

  && > p {
    padding: 0;
    margin: 0.25rem;
  }
`;

const StyledTrashButton = styled.button`
  background: none;
  color: inherit;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: inherit;
`;

// Returns true if the hour is 18+
function isNightTime(time) {
  const split = time.split(":");
  const hour = parseInt(split[0]);
  const isNight = hour >= 18;
  return isNight;
}

export default function MedicineBox({ medicineObj, medicationInfo }) {
  return (
    <StyledDiv className="box">
      <StyledH2>Your medicines:</StyledH2>
      <StyledList>
        {medicationInfo &&
          medicationInfo.map((medication) => (
            <Box key={medication.id} isNight={isNightTime(medication.medtime)}>
              <StyledHeader>
                <StyledTitle>
                  {medication.medname} {medication.meddose}
                  {medication.units}
                </StyledTitle>
                <StyledIcons>
                  <FontAwesomeIcon
                    className="iconTime"
                    size="lg"
                    icon={
                      isNightTime(medication.medtime) ? moon.icon : sun.icon
                    }
                  />
                  <form method="POST" action="/api/delete-med">
                    <input
                      type="hidden"
                      id="deleteInput"
                      name="id"
                      value={medication.id}
                    />
                    <StyledTrashButton type="submit">
                      <FontAwesomeIcon
                        className="iconTime"
                        size="lg"
                        icon={trash.icon}
                      />
                    </StyledTrashButton>
                  </form>
                </StyledIcons>
              </StyledHeader>

              <StyledInfo>
                <p>Type: {medication.medicationtype}</p>
                <p>Time: {medication.medtime}</p>
                <p>Notes: {medication.notes}</p>
              </StyledInfo>
            </Box>
          ))}
      </StyledList>
    </StyledDiv>
  );
}

/* <p>
            {medicineObj.remaining} / {medicineObj.total} {medicineObj.drug}
          </p> */
