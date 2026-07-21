import React from "react";
import { Formik, Form, Field } from "formik";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: 500;
`;

const Toggle = styled(Field)`
  margin-right: 8px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background: #ffc107;
  border: none;
  border-radius: 6px;
  color: black;
  cursor: pointer;
  font-size: 14px;
`;

const TesterDetailsStep = ({ onNext }) => {
  return (
    <Formik
      initialValues={{ automation: false, reporting: false }}
      onSubmit={(values) => {
        console.log("Tester Details:", values);
        onNext(values);
      }}
    >
      {() => (
        <Form>
          <Container>
            <div>
              <Label>
                <Toggle type="checkbox" name="automation" />
                Enable Automation Testing
              </Label>
            </div>
            <div>
              <Label>
                <Toggle type="checkbox" name="reporting" />
                Enable Reporting
              </Label>
            </div>

            <Button type="submit">Finish</Button>
          </Container>
        </Form>
      )}
    </Formik>
  );
};

export default TesterDetailsStep;
