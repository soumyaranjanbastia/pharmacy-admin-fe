import React from "react";
import { Formik, Form, Field } from "formik";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const CheckboxGroup = styled.div`
  display: flex;
  gap: 12px;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: 500;
`;

const Button = styled.button`
  padding: 10px 20px;
  background: #28a745;
  border: none;
  border-radius: 6px;
  color: white;
  cursor: pointer;
  font-size: 14px;
`;

const TechnicianDetailsStep = ({ onNext }) => {
  return (
    <Formik
      initialValues={{ skills: [], available: false }}
      onSubmit={(values) => {
        console.log("Technician Details:", values);
        onNext(values);
      }}
    >
      {({ values }) => (
        <Form>
          <Container>
            <div>
              <Label>Skills</Label>
              <CheckboxGroup>
                <label>
                  <Field type="checkbox" name="skills" value="Electrical" />
                  Electrical
                </label>
                <label>
                  <Field type="checkbox" name="skills" value="Mechanical" />
                  Mechanical
                </label>
                <label>
                  <Field type="checkbox" name="skills" value="Networking" />
                  Networking
                </label>
              </CheckboxGroup>
            </div>

            <div>
              <label>
                <Field type="checkbox" name="available" />
                Available for assignments
              </label>
            </div>

            <Button type="submit">Next</Button>
          </Container>
        </Form>
      )}
    </Formik>
  );
};

export default TechnicianDetailsStep;
