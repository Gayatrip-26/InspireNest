import React, { useState } from 'react';
import ReactPlayer from 'react-player';
import ChildNav from '../components/ChildNav';
import Card from '../components/Card';
import Button from '../components/Button';
import './VideoLectures.css';

const VideoLectures = () => {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [watchedLessons, setWatchedLessons] = useState(
    JSON.parse(localStorage.getItem('watchedLessons') || '[]')
  );
  const [playing, setPlaying] = useState(true);

  // Course structure with video lectures (AI-generated cartoon character videos)
  const courses = [
    {
      id: 'math-basics',
      title: 'Math Basics with Chota Bheem',
      icon: '🔢',
      character: 'Chota Bheem',
      characterEmoji: '🧑‍🦱',
      description: 'Learn counting, addition, and subtraction with fun animations!',
      level: 1,
      lessons: [
        {
          id: 1,
          title: 'Counting Numbers 1-10',
          videoUrl: 'https://www.youtube.com/watch?v=DR-cfDsHCGA', // Educational counting video
          duration: '5:30',
          description: 'Learn to count from 1 to 10 with fun animations and music!',
          thumbnail: '📺'
        },
        {
          id: 2,
          title: 'Addition Made Easy',
          videoUrl: 'https://www.youtube.com/watch?v=igcoDFokKzU', // Addition learning video
          duration: '6:15',
          description: 'Learn how to add numbers with colorful examples and songs!',
          thumbnail: '📺'
        },
        {
          id: 3,
          title: 'Subtraction Fun',
          videoUrl: 'https://www.youtube.com/watch?v=Q9C-oJlEawY', // Subtraction video
          duration: '5:45',
          description: 'Master subtraction with fun animated examples!',
          thumbnail: '📺'
        },
        {
          id: 4,
          title: 'Shapes and Patterns',
          videoUrl: 'https://www.youtube.com/watch?v=Ok6dIb7MLdY', // Shapes video
          duration: '6:00',
          description: 'Learn about different shapes and patterns!',
          thumbnail: '📺'
        }
      ]
    },
    {
      id: 'language-fun',
      title: 'Language Learning with Animated Characters',
      icon: '📚',
      character: 'Animated Friends',
      characterEmoji: '👶',
      description: 'Learn letters, words, and sentences with fun cartoons!',
      level: 1,
      lessons: [
        {
          id: 1,
          title: 'ABC Alphabet Song',
          videoUrl: 'https://www.youtube.com/watch?v=75p-N9YKqNo', // Alphabet song
          duration: '4:20',
          description: 'Sing along to learn the alphabet with fun music and animations!',
          thumbnail: '📺'
        },
        {
          id: 2,
          title: 'Phonics and Simple Words',
          videoUrl: 'https://www.youtube.com/watch?v=saF3-f0XWAY', // Phonics video
          duration: '5:10',
          description: 'Learn to read simple words with phonics!',
          thumbnail: '📺'
        },
        {
          id: 3,
          title: 'Building Sentences',
          videoUrl: 'https://www.youtube.com/watch?v=0Wrv_ZviMEc', // Sentences video
          duration: '6:30',
          description: 'Put words together to make sentences!',
          thumbnail: '📺'
        }
      ]
    },
    {
      id: 'science-world',
      title: 'Science Discovery with Cartoons',
      icon: '🔬',
      character: 'Science Friends',
      characterEmoji: '🤖',
      description: 'Explore science and nature with animated characters!',
      level: 2,
      lessons: [
        {
          id: 1,
          title: 'Plants and Flowers',
          videoUrl: 'https://www.youtube.com/watch?v=dUBqCz4jeHE', // Plants video
          duration: '7:00',
          description: 'Learn about different plants and how they grow!',
          thumbnail: '📺'
        },
        {
          id: 2,
          title: 'Animals Around Us',
          videoUrl: 'https://www.youtube.com/watch?v=25_u1GzruQM', // Animals video
          duration: '6:45',
          description: 'Discover amazing animals and their homes!',
          thumbnail: '📺'
        },
        {
          id: 3,
          title: 'Weather and Seasons',
          videoUrl: 'https://www.youtube.com/watch?v=GcLZd3s5qyQ', // Weather video
          duration: '5:50',
          description: 'Understand different weather and seasons!',
          thumbnail: '📺'
        }
      ]
    },
    {
      id: 'colors-shapes',
      title: 'Colors & Shapes with Fun Animations',
      icon: '🎨',
      character: 'Color Friends',
      characterEmoji: '🐷',
      description: 'Learn colors and shapes with colorful animations!',
      level: 1,
      lessons: [
        {
          id: 1,
          title: 'All About Colors',
          videoUrl: 'https://www.youtube.com/watch?v=YkQeX2nM3-8', // Colors video
          duration: '5:00',
          description: 'Learn all the beautiful colors with songs and animations!',
          thumbnail: '📺'
        },
        {
          id: 2,
          title: 'Shapes Everywhere',
          videoUrl: 'https://www.youtube.com/watch?v=Ok6dIb7MLdY', // Shapes video
          duration: '5:30',
          description: 'Find shapes in the world around you!',
          thumbnail: '📺'
        }
      ]
    },
    {
      id: 'social-skills',
      title: 'Social Skills with Animated Friends',
      icon: '🤝',
      character: 'Friendly Characters',
      characterEmoji: '⚡',
      description: 'Learn to make friends and be kind!',
      level: 2,
      lessons: [
        {
          id: 1,
          title: 'Being a Good Friend',
          videoUrl: 'https://www.youtube.com/watch?v=GvnEQ87xI9E', // Friendship video
          duration: '6:20',
          description: 'Learn how to be a great friend with animated stories!',
          thumbnail: '📺'
        },
        {
          id: 2,
          title: 'Sharing is Caring',
          videoUrl: 'https://www.youtube.com/watch?v=gghDRJVxFxU', // Sharing video
          duration: '5:40',
          description: 'Discover why sharing makes everyone happy!',
          thumbnail: '📺'
        },
        {
          id: 3,
          title: 'Good Manners',
          videoUrl: 'https://www.youtube.com/watch?v=GjnwN6ePcqQ', // Manners video
          duration: '4:50',
          description: 'Learn good manners like please, thank you, and sorry!',
          thumbnail: '📺'
        }
      ]
    },
    {
      id: 'emotions',
      title: 'Understanding Emotions',
      icon: '❄️',
      character: 'Emotion Friends',
      characterEmoji: '👸',
      description: 'Learn about feelings and emotions!',
      level: 2,
      lessons: [
        {
          id: 1,
          title: 'Happy and Sad Feelings',
          videoUrl: 'https://www.youtube.com/watch?v=dOkyKyVFnSs', // Emotions video
          duration: '5:15',
          description: 'Understand happy and sad feelings with animated characters!',
          thumbnail: '📺'
        },
        {
          id: 2,
          title: 'Managing Big Feelings',
          videoUrl: 'https://www.youtube.com/watch?v=ZxfJicfyCdg', // Managing emotions
          duration: '6:00',
          description: 'Learn to manage anger and stay calm!',
          thumbnail: '📺'
        }
      ]
    }
  ];

  const handleCourseSelect = (course) => {
    setSelectedCourse(course);
    setSelectedLesson(null);
    setPlaying(false);
  };

  const handleLessonSelect = (lesson) => {
    setSelectedLesson(lesson);
    setPlaying(true);
  };

  const markLessonComplete = (courseId, lessonId) => {
    const lessonKey = `${courseId}-${lessonId}`;
    if (!watchedLessons.includes(lessonKey)) {
      const updated = [...watchedLessons, lessonKey];
      setWatchedLessons(updated);
      localStorage.setItem('watchedLessons', JSON.stringify(updated));

      // Save activity
      const activity = {
        icon: '📺',
        title: `Watched: ${selectedCourse.title} - Lesson ${lessonId}`,
        date: new Date().toLocaleDateString(),
        points: 15
      };
      
      const activities = JSON.parse(localStorage.getItem('recentActivity') || '[]');
      activities.unshift(activity);
      localStorage.setItem('recentActivity', JSON.stringify(activities.slice(0, 10)));

      const totalStars = parseInt(localStorage.getItem('totalStars') || '0') + 15;
      localStorage.setItem('totalStars', totalStars.toString());
    }
  };

  const handleVideoProgress = ({ played, playedSeconds }) => {
    // Mark as complete if 80% watched
    if (selectedLesson && played >= 0.8) {
      const lessonKey = `${selectedCourse.id}-${selectedLesson.id}`;
      if (!watchedLessons.includes(lessonKey)) {
        markLessonComplete(selectedCourse.id, selectedLesson.id);
      }
    }
  };

  const handleVideoEnd = () => {
    if (selectedLesson) {
      markLessonComplete(selectedCourse.id, selectedLesson.id);
    }
  };

  const isLessonWatched = (courseId, lessonId) => {
    return watchedLessons.includes(`${courseId}-${lessonId}`);
  };

  const getCourseProgress = (course) => {
    const watched = course.lessons.filter(l => isLessonWatched(course.id, l.id)).length;
    return Math.round((watched / course.lessons.length) * 100);
  };

  return (
    <div className="video-lectures">
      <ChildNav />
      <div className="lectures-content">
        <div className="lectures-header">
          <h1>Video Lectures 🎬</h1>
          <p>Learn with animated cartoon characters! Watch, listen, and learn!</p>
        </div>

        {!selectedCourse ? (
          <div className="courses-grid">
            {courses.map((course) => {
              const progress = getCourseProgress(course);
              return (
                <Card key={course.id} className="course-card" onClick={() => handleCourseSelect(course)}>
                  <div className="course-header">
                    <div className="course-icon">{course.icon}</div>
                    <div className="course-character">
                      <span className="character-emoji">{course.characterEmoji}</span>
                      <span className="character-name">{course.character}</span>
                    </div>
                  </div>
                  <h2>{course.title}</h2>
                  <p>{course.description}</p>
                  <div className="course-stats">
                    <div className="stat">
                      <span className="stat-label">Lessons:</span>
                      <span className="stat-value">{course.lessons.length}</span>
                    </div>
                    <div className="stat">
                      <span className="stat-label">Level:</span>
                      <span className="stat-value">{course.level}</span>
                    </div>
                  </div>
                  {progress > 0 && (
                    <div className="course-progress">
                      <div className="progress-bar-course">
                        <div 
                          className="progress-fill-course" 
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                      <span className="progress-text">{progress}% Complete</span>
                    </div>
                  )}
                  <Button>Start Learning</Button>
                </Card>
              );
            })}
          </div>
        ) : !selectedLesson ? (
          <div className="lessons-view">
            <Button variant="secondary" onClick={() => setSelectedCourse(null)} className="back-btn">
              ← Back to Courses
            </Button>
            <Card className="course-info-card">
              <div className="course-info-header">
                <div className="course-icon-large">{selectedCourse.icon}</div>
                <div>
                  <h2>{selectedCourse.title}</h2>
                  <div className="course-character-info">
                    <span className="character-emoji-large">{selectedCourse.characterEmoji}</span>
                    <span>with {selectedCourse.character}</span>
                  </div>
                </div>
              </div>
              <p className="course-description">{selectedCourse.description}</p>
            </Card>

            <div className="lessons-list">
              <h3>Course Lessons</h3>
              {selectedCourse.lessons.map((lesson, index) => {
                const isWatched = isLessonWatched(selectedCourse.id, lesson.id);
                return (
                  <Card 
                    key={lesson.id} 
                    className={`lesson-card ${isWatched ? 'watched' : ''}`}
                    onClick={() => handleLessonSelect(lesson)}
                  >
                    <div className="lesson-number">{index + 1}</div>
                    <div className="lesson-thumbnail">{lesson.thumbnail}</div>
                    <div className="lesson-info">
                      <h4>{lesson.title}</h4>
                      <p>{lesson.description}</p>
                      <div className="lesson-meta">
                        <span>⏱️ {lesson.duration}</span>
                        <span>🎬 Video</span>
                        {isWatched && <span className="watched-badge">✅ Watched</span>}
                      </div>
                    </div>
                    <Button size="small">Watch</Button>
                  </Card>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="video-player-view">
            <Button variant="secondary" onClick={() => setSelectedLesson(null)} className="back-btn">
              ← Back to Lessons
            </Button>
            <Card className="video-player-card">
              <div className="video-header">
                <h2>{selectedLesson.title}</h2>
                <p className="lesson-description">{selectedLesson.description}</p>
                <div className="lesson-info-bar">
                  <span>🎬 {selectedCourse.character}</span>
                  <span>⏱️ {selectedLesson.duration}</span>
                  <span>📚 Level {selectedCourse.level}</span>
                </div>
              </div>
              
              <div className="video-container-wrapper">
                <div className="video-player-wrapper">
                  <ReactPlayer
                    url={selectedLesson.videoUrl}
                    playing={playing}
                    controls={true}
                    width="100%"
                    height="100%"
                    onProgress={handleVideoProgress}
                    onEnded={handleVideoEnd}
                    config={{
                      youtube: {
                        playerVars: {
                          rel: 0,
                          modestbranding: 1,
                          showinfo: 0,
                        }
                      }
                    }}
                  />
                </div>
              </div>

              <div className="video-actions">
                <Button 
                  size="large" 
                  variant="success"
                  onClick={() => markLessonComplete(selectedCourse.id, selectedLesson.id)}
                  disabled={isLessonWatched(selectedCourse.id, selectedLesson.id)}
                >
                  {isLessonWatched(selectedCourse.id, selectedLesson.id) 
                    ? '✅ Lesson Completed' 
                    : 'Mark as Complete'}
                </Button>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoLectures;