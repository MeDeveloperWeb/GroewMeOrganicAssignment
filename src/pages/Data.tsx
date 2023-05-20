import { useEffect, useState } from "react";
import { Box, Grid, Card, CardContent, Typography } from '@mui/material';

interface DataType {
    // type delcaration for Data obtained from api
    id: number,
    user_id: number,
    title: string,
    body: string
}


function Data() {
    // State for storing data (and changing)
    const [data, setData] = useState<DataType[]>([]);

    // Store the data after app is loaded
    useEffect(()=>{
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then(res => res.json())
            .then(res => setData(res));
    }, [])

    return (
        <Box sx={{display:"flex", flexDirection: "column", flexGrow: 1, marginTop: "2rem", alignItems: "center" }}>
            <Grid container spacing={{ xs: 2, md: 3 }}>
                {
                    data.map((each) => (
                        <Grid key={each.id} item xs={12} sm={6} md={4} lg={3}>
                            <Card elevation={16} sx={{borderRadius: "10px"}}>
                                <CardContent>
                                    <Typography variant="h6" component="div">
                                        {each.title}
                                    </Typography>
                                    {each.body}
                                </CardContent>
                            </Card>
                        </Grid>
                    ))
                }
            </Grid>
        </Box>
       
    )
}

export default Data;