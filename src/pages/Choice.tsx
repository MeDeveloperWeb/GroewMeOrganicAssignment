import { Box, Checkbox, FormControlLabel, Paper } from "@mui/material";
import { useState } from "react";

interface dataInterface {
	// interface for the given data
	department: string,
	sub_departments: string[]
}

// Copied data from the docx file
const data : dataInterface[] = [
	{
		"department": "customer_service",
		"sub_departments": [
			"support",
			"customer_success"
		]
	},
	{
		"department": "design",
		"sub_departments": [
			"graphic_design",
			"product_design",
			"web_design"
		]
	}
]

function Choices() {
	// Returns the checkbox for departments and sbdepartments with help of another function 'DeptCheckBox'.
	return (
		<Paper elevation={21} sx={{width: "fit-content", margin: "10vh auto", padding:"1rem 2rem"}}>
			{
				// For each department in the data
				data.map((each) => (
					// Make checkBox for department and sub_departments
					<DeptCheckBox key={each.department} data={each}/>
				))
			}
		</Paper>
	)
}

// Main function that handles the cration of Checkboxes
function DeptCheckBox({data} : {data : dataInterface}) {
	
	// Set the state for checked subdepartments
	// checked is boolean array of length of sub departments of the department
	//  // Initially all set to false.
    const [checked, setCheck] = useState<boolean[]>(Array(data.sub_departments.length).fill(false));

	// If the department is checked or unchecked
	// Do the same for its sub departments
	const handleChangeParent = (event : React.ChangeEvent<HTMLInputElement>) => {
		setCheck(Array(data.sub_departments.length).fill(event.target.checked))
	}

	// Change the value of checked array according to the sub department state of checked or unchecked
	const handleChangeChildren = (event : React.ChangeEvent<HTMLInputElement>, i : number) => {
		setCheck([...checked.slice(0, i), event.target.checked, ...checked.slice(i + 1, data.sub_departments.length)])
	}

	// Checks if all sub departments of department are checked
	const allChecked = () => {
		for (let each of checked) {
			if (!each) return false;
		}
		return true;
	}

	// Map the subdepartments of the department
	const children = (
		<Box sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}>
			{
				data.sub_departments.map((each, i) => (
					// Checked value of sub_department is determined using the checked array
					// 'handleChangeChildren' handles the change in check state
					<FormControlLabel key={each + i}
						label={getLabelName(each)}
						control={<Checkbox checked={checked[i]} onChange={(event) => handleChangeChildren(event, i)} />}
					/>
				))
			}
    	</Box>
	)

	return (
		<div>
			{/* Parent Checkbox */}
			{/* Check state is determined by allChecked Function */}
			{/* If all sub departments are checked, Department is also checked */}
			{/* Else department is unchecked */}
			{/* Change in department check state is determined by 'handleChangeParent' function */}
			<FormControlLabel
				label={getLabelName(data.department)}
				control={
				<Checkbox
					checked={allChecked()}
					onChange={handleChangeParent}
				/>
				}
			/>
			{/* Add the subdepartment checkboxes */}
			{children}
		</div>
	)

}

function getLabelName(name : string) {
	// Returns the neat label name for display
	// Ex. Return Web Design for web_design

	// Split the string from '_' character
	const arr = name.split("_");

	// Capitalize first letter of each word
	for (let i in arr) {
		arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
	}
	
	//Join all the elements of the array back into a string using a blankspace as a separator 
	return arr.join(" ");
}

export default Choices;