import {
  Divider,
  Grid,
  Box,
  FormControl,
  TextField,
  Typography,
} from "@mui/material";
import {
  associateContext,
  updatedAssociateContext,
} from "../../../utils/context/contexts";
import { useContext, useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../../utils/firebase";

const AssociateEmergencyInfo = () => {
  const { associateData, setAssociateData } = useContext(associateContext);
  const { updatedAssociate, setUpdateAssociate } = useContext(
    updatedAssociateContext
  );

  const [edited, setEdited] = useState(false);

  const onUpdate = (event) => {
    setAssociateData({
      ...associateData,
      [event.target.name]: event.target.value,
    });
    setEdited(true);
  };
  const onUpdateNested = (event) => {
    setEdited(true);
    setUpdateAssociate({
      ...updatedAssociate,
      emergencyInfo: {
        ...updatedAssociate.emergencyInfo,
        [event.target.name]: event.target.value,
      },
    });
    console.log(updatedAssociate);
  };
  const SaveDetails = async () => {
    const resutl = await setDoc(
      doc(db, "Associates", associateData.id),
      associateData
    );
    console.log("result after post data", resutl);
  };

  //   const SaveDetails = async (id) => {
  //     const res = await fetch(`http://localhost:5000/associates/${id}`, {
  //       method: 'PUT',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body:JSON.stringify(associateData)
  //     })

  //     console.log(res.status)
  // }
  const onSubmit = (event) => {
    event.preventDefault();
    SaveDetails(associateData.id);
    setEdited(false);
  };

  return (
    <Box sx={{ p: 0, pb: 1 }} dir="ltr">
      <Typography variant="inherit">Emergency Information</Typography>
      <Divider variant="middle" sx={{ pb: 2 }} />
      <FormControl sx={{ pt: 3 }}>
        {/* <form onSubmit={e =>onSubmit(e)}> */}
        <Grid
          sx={{ p: 1, pb: 5, pt: 2 }}
          container
          columnSpacing={2}
          rowSpacing={2}
          direction="row"
          justifyContent="flex-start"
          alignItems="flex-start"
        >
          <Grid item xs={2} xm={2}>
            <TextField
              style={{ width: "100%" }}
              size="small"
              name="FirstName"
              label="First Name"
              defaultValue={associateData.emergencyInfo.FirstName}
              onChange={(e) => onUpdateNested(e)}
            />
          </Grid>
          <Grid item>
            <TextField
              style={{ width: "100%" }}
              size="small"
              name="LastName"
              label="Last Name"
              defaultValue={associateData.emergencyInfo.LastName}
              onChange={(e) => onUpdateNested(e)}
            />
          </Grid>
          <Grid item>
            <TextField
              style={{ width: "100%" }}
              size="small"
              name="Relationship"
              label="Relationship"
              defaultValue={associateData.emergencyInfo.Relationship}
              onChange={(e) => onUpdateNested(e)}
            />
          </Grid>
          <Grid item>
            <TextField
              style={{ width: "100%" }}
              size="small"
              name="TelephoneNumber"
              label="Telephone Nummber"
              defaultValue={associateData.emergencyInfo.TelephoneNumber}
              onChange={(e) => onUpdateNested(e)}
            />
          </Grid>
        </Grid>
        {/* </form> */}
      </FormControl>
    </Box>
  );
};

export default AssociateEmergencyInfo;
