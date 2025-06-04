const express = require("express");
const app = express();

const users = [{
    name: 'John',
    kidneys: [{
        healthy: false
    }]
}];

app.use(express.json());

app.get("/", function(req, res) {
    const johnKidneys = users[0].kidneys;
    const numberOfKidney = johnKidneys.length;
    let numberOfHealthyKidneys = 0;
    for (let i = 0; i < johnKidneys.length; i++) {
        if (johnKidneys[i].healthy) {
            numberOfHealthyKidneys++;
        }
    }
    const numberOfUnhealthyKidneys = numberOfKidney - numberOfHealthyKidneys;
    res.json({
        numberOfKidney,
        numberOfHealthyKidneys,
        numberOfUnhealthyKidneys
    });
});

app.post("/", function(req, res) {
    const isHealthy = req.body.isHealthy;
    users[0].kidneys.push({
        healthy: isHealthy
    });
    res.json({
        message: "Kidney added successfully"
    });
});

app.put("/", function(req, res) {
    for (let i = 0; i < users[0].kidneys.length; i++) {
        users[0].kidneys[i].healthy = true;
    }
    res.json({});
});

app.delete("/", function(req, res) {
    if (isThereAtLeastOneUnhealthyKidney()) {
        const newKidneys = [];
        for (let i = 0; i < users[0].kidneys.length; i++) {
            if (users[0].kidneys[i].healthy) {
                newKidneys.push({
                    healthy: true
                });
            }
        }
        users[0].kidneys = newKidneys;
        res.json({
            message: "Unhealthy kidneys deleted successfully"
        });
    } else {
        res.status(422).json({
            message: "There are no unhealthy kidneys to delete"
        });
    }
});

function isThereAtLeastOneUnhealthyKidney() {
    let atleastOneUnhealthyKidney = false;
    for (let i = 0; i < users[0].kidneys.length; i++) {
        if (!users[0].kidneys[i].healthy) {
            atleastOneUnhealthyKidney = true;
        }
    }
    return atleastOneUnhealthyKidney;
}

app.listen(3000);
