
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { Course, fetchCourses } from '../../api/courses';

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
const times = ['9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'];
const CELL_HEIGHT = 80; 
const DAY_WIDTH = 120; 

const TimetableScheduler = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCourses = async () => {
      try {
        const fetchedCourses = await fetchCourses();
        setCourses(fetchedCourses);
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setLoading(false);
      }
    };

    getCourses();
  }, []);

  const getCoursePosition = (course: Course) => {
    const dayIndex = days.indexOf(course.day);
    const startTimeIndex = times.indexOf(course.startTime);
    const endTimeIndex = times.indexOf(course.endTime);

    if (dayIndex < 0 || startTimeIndex < 0 || endTimeIndex < 0 || endTimeIndex <= startTimeIndex) {
      return null;
    }

    const top = startTimeIndex * CELL_HEIGHT;
    const left = dayIndex * DAY_WIDTH;
    const height = (endTimeIndex - startTimeIndex) * CELL_HEIGHT - 2; // -2 for margin
    const width = DAY_WIDTH - 2; // -2 for margin

    return { top, left, height, width };
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
        <Text>Loading schedule...</Text>
      </View>
    );
  }

  return (
    <View style={{flex: 1}}>
        <View style={styles.header}>
            <View style={styles.timeColumnHeader} />
            {days.map(day => (
            <Text key={day} style={styles.headerText}>{day}</Text>
            ))}
        </View>
        <ScrollView style={styles.container}>
            <View style={styles.gridContainer}>
                {/* Time Column */}
                <View style={styles.timeColumn}>
                {times.map(time => (
                    <Text key={time} style={styles.timeText}>{time}</Text>
                ))}
                </View>

                {/* Schedule Grid */}
                <View style={styles.scheduleGrid}>
                    {/* Horizontal Lines */}
                    {times.map((_, index) => (
                        <View key={index} style={[styles.gridRow, { top: index * CELL_HEIGHT }]} />
                    ))}
                    {/* Vertical Lines */}
                    {days.map((_, index) => (
                         <View key={index} style={[styles.gridCol, { left: index * DAY_WIDTH }]} />
                    ))}


                    {/* Courses */}
                    {courses.map(course => {
                        const position = getCoursePosition(course);
                        if (!position) return null;

                        return (
                            <View key={course.id} style={[styles.courseItem, { top: position.top, left: position.left, width: position.width, height: position.height, backgroundColor: course.color }]}>
                                <Text style={styles.courseName}>{course.name}</Text>
                                <Text style={styles.courseInfo}>{course.room}</Text>
                                <Text style={styles.courseInfo}>- {course.faculty}</Text>
                            </View>
                        );
                    })}
                </View>
            </View>
        </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        flexDirection: 'row',
        backgroundColor: '#f4f4f4',
        borderBottomWidth: 2,
        borderBottomColor: '#ddd',
    },
    headerText: {
        flex: 1,
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'center',
        padding: 10,
        width: DAY_WIDTH,
    },
    timeColumnHeader: {
        width: 60,
        padding: 10,
    },
    gridContainer: {
        flex: 1,
        flexDirection: 'row',
    },
    timeColumn: {
        width: 60,
        backgroundColor: '#f9f9f9',
    },
    timeText: {
        height: CELL_HEIGHT,
        textAlign: 'center',
        paddingTop: 5,
        fontSize: 12,
        color: '#555',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    scheduleGrid: {
        flex: 1,
        position: 'relative',
        flexDirection: 'row',
    },
    gridRow: {
        position: 'absolute',
        width: '100%',
        height: 1,
        backgroundColor: '#eee',
        zIndex: 0,
    },
    gridCol: {
        position: 'absolute',
        height: '100%',
        width: 1,
        backgroundColor: '#eee',
        zIndex: 0,
    },
    courseItem: {
        position: 'absolute',
        borderRadius: 4,
        padding: 5,
        margin: 1,
        zIndex: 1,
    },
    courseName: {
        fontWeight: 'bold',
        fontSize: 12,
    },
    courseInfo: {
        fontSize: 10,
    },
});

export default TimetableScheduler;
