import MedicineBox from "../components/medicineBox.jsx";
import Layout from "../components/layout";
import MedicationForm from "../components/medicationForm.jsx";
import { useState } from "react";
import { getAllMeds } from "../database/model";
import { getSessionInfo } from "../database/model";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const StyledToggle = styled.button`
  background: var(--color-two);
  margin: 0 auto;
  display: block;
  box-shadow: var(--box-shadow);
  border-radius: 5px;
  box-sizing: border-box;
  color: #ffffff;
  cursor: pointer;
  display: inline-block;
  font-family: var(--heading-font);
  font-size: 1.2rem;
  line-height: 20px;
  list-style: none;
  outline: none;
  padding: 10px 16px;
  position: relative;
  text-align: center;
  text-decoration: none;
  transition: color 100ms;
  border: none;
  width: 90%;
`;

export async function getServerSideProps({ req, res }) {
  const userData = await getSessionInfo(req.cookies.sid);
  const user_id = JSON.parse(userData.data).user_id;

  const medicationInfo = await getAllMeds(user_id);

  console.log(medicationInfo);
  return {
    props: {
      medicationInfo,
    },
  };
}

export default function MedicationPage({ medicationInfo }) {
  const [formOpen, setFormOpen] = useState(false);
  function handleClick() {
    setFormOpen((prevState) => !prevState);
  }
  return (
    <div>
      <Layout>
        <MedicineBox medicationInfo={medicationInfo}></MedicineBox>
        <StyledToggle id="toggle" type="submit" onClick={handleClick}>
          {!formOpen && <>Add Medicines</>}

          {formOpen && <>Hide form</>}
        </StyledToggle>
        {formOpen === true && <MedicationForm></MedicationForm>}
      </Layout>
    </div>
  );
}
