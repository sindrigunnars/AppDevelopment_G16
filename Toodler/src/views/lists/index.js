import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  Button,
  FlatList,
  StatusBar,
  Text,
  View,
  SafeAreaView,
  SectionList,
  StyleSheet,
} from "react-native";
import List from "../../components/list";
import data from "../../resources/data.json";

const Lists = ({ route, navigation: { navigate } }) => {
  const { boardId } = route.params;
  const [lists, setLists] = useState([]);

  useEffect(() => {
    // looping through the data to retrieve the lists for the board in question
    let listData = [];
    data.lists.forEach((item) => {
      if (item.boardId === boardId) {
        listData.push({
          key: item.id,
          name: item.name,
          color: "",
          tasks: [],
        });
      }
      listData.forEach((item) => {
        const taskList = [];

        data.tasks.forEach((task) => {
          if (task.listId === item.key) {
            taskList.push(task);
            console.log("Found task " + task.id);
          }
        });
        console.log("Updated");
        item.tasks = taskList; // updates list info after we found the tasks
      });
      setLists(listData);
    });

    console.log(listData);
  }, []); // runs when component mounts

  return (
    <View>
      <Text style={styles.coolstyle}>Board {boardId}</Text>
      <View>
        {lists.map((list) => {
          return <List style={styles.item} {...list} />;
        })}
      </View>
    </View>
  );
};

Lists.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  route: PropTypes.object.isRequired,
};

export default Lists;

const styles = StyleSheet.create({
  coolstyle: {
    fontSize: 40,
  },
});
