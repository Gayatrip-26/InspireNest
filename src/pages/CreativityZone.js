import React, { useState, useRef, useEffect } from 'react';
import ChildNav from '../components/ChildNav';
import Card from '../components/Card';
import Button from '../components/Button';
import './CreativityZone.css';

const CreativityZone = () => {
  const [selectedTool, setSelectedTool] = useState(null);
  const [drawingColor, setDrawingColor] = useState('#000000');
  const [brushSize, setBrushSize] = useState(5);
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);

  const colors = [
    '#000000', '#FF0000', '#00FF00', '#0000FF', '#FFFF00', 
    '#FF00FF', '#00FFFF', '#FFA500', '#800080', '#FFC0CB'
  ];

  useEffect(() => {
    if (selectedTool === 'draw' && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
  }, [selectedTool]);

  const startDrawing = (e) => {
    if (selectedTool !== 'draw' || !canvasRef.current) return;
    setIsDrawing(true);
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;
    const ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (x, y) => {
    if (!isDrawing || selectedTool !== 'draw' || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.lineWidth = brushSize;
    ctx.lineCap = 'round';
    ctx.strokeStyle = drawingColor;
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    if (selectedTool === 'draw' && canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      ctx.beginPath();
    }
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  const handleSave = () => {
    // Simulate saving
    const activity = {
      icon: '🎨',
      title: 'Creative Art Created',
      date: new Date().toLocaleDateString(),
      points: 10
    };
    
    const activities = JSON.parse(localStorage.getItem('recentActivity') || '[]');
    activities.unshift(activity);
    localStorage.setItem('recentActivity', JSON.stringify(activities.slice(0, 10)));

    const totalStars = parseInt(localStorage.getItem('totalStars') || '0') + 10;
    localStorage.setItem('totalStars', totalStars.toString());

    alert('Your artwork has been saved! Great creativity! 🎨🌟');
  };

  const storyPrompts = [
    'Once upon a time, there was a magical...',
    'In a land far away, there lived a...',
    'The brave explorer discovered...',
    'On a sunny day, the friends decided to...'
  ];

  const [storyText, setStoryText] = useState('');

  const handleStorySave = () => {
    if (!storyText.trim()) {
      alert('Please write something first!');
      return;
    }

    const activity = {
      icon: '📝',
      title: 'Creative Story Written',
      date: new Date().toLocaleDateString(),
      points: 15
    };
    
    const activities = JSON.parse(localStorage.getItem('recentActivity') || '[]');
    activities.unshift(activity);
    localStorage.setItem('recentActivity', JSON.stringify(activities.slice(0, 10)));

    const totalStars = parseInt(localStorage.getItem('totalStars') || '0') + 15;
    localStorage.setItem('totalStars', totalStars.toString());

    alert('Your story has been saved! Wonderful writing! 📝🌟');
    setStoryText('');
  };

  return (
    <div className="creativity-zone">
      <ChildNav />
      <div className="creativity-content">
        <div className="creativity-header">
          <h1>Creativity Zone 🎨</h1>
          <p>Express yourself through art, drawing, and creative writing!</p>
        </div>

        {!selectedTool ? (
          <div className="creativity-options">
            <Card className="tool-card" onClick={() => setSelectedTool('draw')}>
              <div className="tool-icon">🖌️</div>
              <h2>Digital Drawing</h2>
              <p>Draw and paint with colorful brushes!</p>
              <Button>Start Drawing</Button>
            </Card>

            <Card className="tool-card" onClick={() => setSelectedTool('story')}>
              <div className="tool-icon">📝</div>
              <h2>Creative Writing</h2>
              <p>Write stories and express your imagination!</p>
              <Button variant="secondary">Start Writing</Button>
            </Card>

            <Card className="tool-card" onClick={() => setSelectedTool('ideas')}>
              <div className="tool-icon">💡</div>
              <h2>Creative Ideas</h2>
              <p>Get inspired with fun creative prompts!</p>
              <Button variant="success">View Ideas</Button>
            </Card>
          </div>
        ) : selectedTool === 'draw' ? (
          <Card className="drawing-container">
            <h2>Digital Drawing 🖌️</h2>
            <div className="drawing-controls">
              <div className="color-picker">
                <label>Colors:</label>
                <div className="colors-grid">
                  {colors.map((color, index) => (
                    <button
                      key={index}
                      className={`color-btn ${drawingColor === color ? 'selected' : ''}`}
                      style={{ backgroundColor: color }}
                      onClick={() => setDrawingColor(color)}
                      aria-label={`Select color ${color}`}
                    />
                  ))}
                </div>
              </div>
              <div className="brush-controls">
                <label>Brush Size: {brushSize}px</label>
                <input
                  type="range"
                  min="1"
                  max="20"
                  value={brushSize}
                  onChange={(e) => setBrushSize(parseInt(e.target.value))}
                  className="brush-slider"
                />
              </div>
            </div>
            <div className="canvas-wrapper">
              <canvas
                ref={canvasRef}
                width={800}
                height={500}
                className="drawing-canvas"
                onMouseDown={startDrawing}
                onMouseMove={(e) => {
                  if (isDrawing && canvasRef.current) {
                    const canvas = canvasRef.current;
                    const rect = canvas.getBoundingClientRect();
                    const scaleX = canvas.width / rect.width;
                    const scaleY = canvas.height / rect.height;
                    const x = (e.clientX - rect.left) * scaleX;
                    const y = (e.clientY - rect.top) * scaleY;
                    draw(x, y);
                  }
                }}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
                onTouchStart={(e) => {
                  e.preventDefault();
                  const touch = e.touches[0];
                  startDrawing({ clientX: touch.clientX, clientY: touch.clientY });
                }}
                onTouchMove={(e) => {
                  e.preventDefault();
                  if (isDrawing && canvasRef.current) {
                    const touch = e.touches[0];
                    const canvas = canvasRef.current;
                    const rect = canvas.getBoundingClientRect();
                    const scaleX = canvas.width / rect.width;
                    const scaleY = canvas.height / rect.height;
                    const x = (touch.clientX - rect.left) * scaleX;
                    const y = (touch.clientY - rect.top) * scaleY;
                    draw(x, y);
                  }
                }}
                onTouchEnd={stopDrawing}
              />
            </div>
            <div className="drawing-actions">
              <Button variant="secondary" onClick={clearCanvas}>Clear</Button>
              <Button onClick={() => setSelectedTool(null)}>Back</Button>
              <Button variant="success" onClick={handleSave}>Save Art</Button>
            </div>
          </Card>
        ) : selectedTool === 'story' ? (
          <Card className="story-container">
            <h2>Creative Writing 📝</h2>
            <div className="story-prompts">
              <h3>Story Starters:</h3>
              <div className="prompts-list">
                {storyPrompts.map((prompt, index) => (
                  <button
                    key={index}
                    className="prompt-btn"
                    onClick={() => setStoryText(prompt)}
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
            <div className="story-editor">
              <textarea
                value={storyText}
                onChange={(e) => setStoryText(e.target.value)}
                placeholder="Start writing your story here... Be creative!"
                className="story-textarea"
                rows="15"
              />
            </div>
            <div className="story-actions">
              <Button variant="secondary" onClick={() => {
                setSelectedTool(null);
                setStoryText('');
              }}>Back</Button>
              <Button variant="success" onClick={handleStorySave}>Save Story</Button>
            </div>
          </Card>
        ) : (
          <Card className="ideas-container">
            <h2>Creative Ideas 💡</h2>
            <div className="ideas-list">
              <div className="idea-item">
                <h3>🎨 Art Ideas</h3>
                <ul>
                  <li>Draw your favorite animal</li>
                  <li>Create a rainbow picture</li>
                  <li>Design your dream house</li>
                  <li>Paint how you feel today</li>
                </ul>
              </div>
              <div className="idea-item">
                <h3>📝 Writing Ideas</h3>
                <ul>
                  <li>Write about your best day ever</li>
                  <li>Create a story about a magical friend</li>
                  <li>Describe your favorite place</li>
                  <li>Write a letter to your future self</li>
                </ul>
              </div>
              <div className="idea-item">
                <h3>🌟 Fun Activities</h3>
                <ul>
                  <li>Make a collage with pictures</li>
                  <li>Create a comic strip</li>
                  <li>Design your own superhero</li>
                  <li>Write a poem about nature</li>
                </ul>
              </div>
            </div>
            <Button onClick={() => setSelectedTool(null)}>Back</Button>
          </Card>
        )}
      </div>
    </div>
  );
};

export default CreativityZone;
