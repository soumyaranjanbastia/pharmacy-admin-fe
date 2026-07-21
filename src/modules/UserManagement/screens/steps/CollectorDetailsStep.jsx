// import React from "react";
// import { Formik, Form, Field } from "formik";
// import styled from "styled-components";

// const Container = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 16px;
// `;

// const Label = styled.label`
//   font-size: 14px;
//   font-weight: 500;
// `;

// const Button = styled.button`
//   padding: 10px 20px;
//   background: #f97316;
//   border: none;
//   border-radius: 6px;
//   color: white;
//   cursor: pointer;
//   font-size: 14px;
// `;

// const CollectorDetailsStep = ({ onNext, onBack }) => {
//   return (
//     <Formik
//       initialValues={{ assignedArea: "", vehicle: "" }}
//       onSubmit={(values) => {
//         console.log("Collector Details:", values);
//         onNext(values);
//       }}
//     >
//       {({ handleChange, values }) => (
//         <Form>
//           <Container>
//             <div>
//               <Label>Assigned Area</Label>
//               <Field
//                 type="text"
//                 name="assignedArea"
//                 placeholder="e.g. Zone 5, Bhubaneswar"
//                 onChange={handleChange}
//                 value={values.assignedArea}
//               />
//             </div>

//             <div>
//               <Label>Vehicle</Label>
//               <Field
//                 type="text"
//                 name="vehicle"
//                 placeholder="e.g. Scooter / Van"
//                 onChange={handleChange}
//                 value={values.vehicle}
//               />
//             </div>

//             <div style={{ display: "flex", gap: "10px" }}>
//               <Button type="button" onClick={onBack} style={{ background: "#6b7280" }}>
//                 ← Previous
//               </Button>
//               <Button type="submit">Next →</Button>
//             </div>
//           </Container>
//         </Form>
//       )}
//     </Formik>
//   );
// };

// export default CollectorDetailsStep;


// CollectorDetailsStep.jsx
import React from "react";
import { Formik, Form, Field } from "formik";
import styled from "styled-components";
import { LuArrowLeft as ArrowLeft, LuArrowRight as ArrowRight } from 'react-icons/lu';

const Container = styled.div` display: flex; flex-direction: column; gap: 16px; `;
const Label = styled.label` font-size: 14px; font-weight: 500; `;
const Button = styled.button`
  padding: 10px 20px;
  background: #f97316;
  border: none;
  border-radius: 6px;
  color: white;
  cursor: pointer;
  font-size: 14px;
`;

const CollectorDetailsStep = ({ data = {}, onNext, onBack }) => {
  return (
    <Formik
      initialValues={{
        assignedArea: data.assignedArea || "",
        vehicle: data.vehicle || "",
      }}
      onSubmit={(values) => {
        // pass details up to wizard; parent will merge them into formData
        onNext(values);
      }}
    >
      {({ handleChange, values }) => (
        <Form>
          <Container>
            <div>
              <Label>Assigned Area</Label>
              <Field
                type="text"
                name="assignedArea"
                placeholder="e.g. Zone 5, Bhubaneswar"
                onChange={handleChange}
                value={values.assignedArea}
              />
            </div>

            <div>
              <Label>Vehicle</Label>
              <Field
                type="text"
                name="vehicle"
                placeholder="e.g. Scooter / Van"
                onChange={handleChange}
                value={values.vehicle}
              />
            </div>

            <div style={{ display: "flex", gap: "10px" }}>
              <Button type="button" onClick={onBack} style={{ background: "#6b7280", display: "inline-flex", alignItems: "center", gap: "8px" }}>
                <ArrowLeft size={16} /> Previous
              </Button>
              <Button type="submit" style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
                Next <ArrowRight size={16} />
              </Button>
            </div>
          </Container>
        </Form>
      )}
    </Formik>
  );
};

export default CollectorDetailsStep;
