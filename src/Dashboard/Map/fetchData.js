import axios from "axios";

const fetchData = async (
  areaURL,
  userURL,
  setRevenueData,
  setGeneralData,
  setAreas
) => {
  let revenueData = {};
  let generalData = {};
  await axios.get(userURL).then((res) => {
    let allUsers = res.data.users;
    let proUsers = allUsers.filter((user) => {
      return user.is_pro_user;
    });

    //total info for General Map
    let totalUsers = allUsers.length;
    let totalMaleUsers = allUsers.filter((user) => {
      return user.gender === "M";
    }).length;
    let totalFemaleUsers = allUsers.filter((user) => {
      return user.gender === "F";
    }).length;
    let totalMatches = allUsers.filter((user) => {
      return user.total_matches;
    }).length;

    //total info for Revenue Map
    let totalProUsers = proUsers.length;
    let totalMaleProUsers = proUsers.filter((user) => {
      return user.gender === "M";
    }).length;
    let totalFemaleProUsers = proUsers.filter((user) => {
      return user.gender === "F";
    }).length;
    let totalProMatches = proUsers.filter((user) => {
      return user.total_matches;
    }).length;
    let totalRevPercentage = ((totalProUsers / totalUsers) * 100).toFixed(1);

    allUsers.forEach((user) => {
      if (!(user.area_id in generalData)) {
        generalData[user.area_id] = {
          totalUsers: 0,
          male: 0,
          female: 0,
          total_matches: 0,
          totalAge: 0,
        };
      } else {
        generalData[user.area_id]["totalUsers"]++;
        generalData[user.area_id]["totalAge"] += user.age;

        if (user.gender === "M") generalData[user.area_id]["male"]++;
        else generalData[user.area_id]["female"]++;

        if (user.total_matches) generalData[user.area_id]["total_matches"]++;
      }
    });
    proUsers.forEach((user) => {
      if (!(user.area_id in revenueData)) {
        revenueData[user.area_id] = {
          totalUsers: 0,
          male: 0,
          female: 0,
          revPercentage: 0,
          total_matches: 0,
        };
      } else {
        revenueData[user.area_id]["totalUsers"] =
          revenueData[user.area_id]["totalUsers"] + 1;

        if (user.gender === "M") revenueData[user.area_id]["male"]++;
        else revenueData[user.area_id]["female"]++;

        revenueData[user.area_id]["revPercentage"] = (
          (revenueData[user.area_id]["totalUsers"] / proUsers.length) *
          100
        ).toFixed(2);

        if (user.total_matches) revenueData[user.area_id]["total_matches"]++;
      }
    });
    revenueData[0] = {
      totalUsers: totalProUsers,
      male: totalMaleProUsers,
      female: totalFemaleProUsers,
      total_matches: totalProMatches,
      totalRevPercentage: totalRevPercentage,
    };
    generalData[0] = {
      totalUsers: totalUsers,
      male: totalMaleUsers,
      female: totalFemaleUsers,
      total_matches: totalMatches,
    };
    setRevenueData(revenueData);
    setGeneralData(generalData);
  });

  await fetch(areaURL)
    .then((res) => res.json())
    .then((new_areas) => {
      new_areas["features"].forEach((area) => {
        area["properties"]["totalProUsers"] =
          revenueData[area.properties.area_id]["totalUsers"];
        area["properties"]["totalGeneralUsers"] =
          generalData[area.properties.area_id]["totalUsers"];
      });
      setAreas(new_areas);
    });
};

export default fetchData;
