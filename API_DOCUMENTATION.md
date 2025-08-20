# API Documentation - Career Progress Tracker

## Overview

This document describes the API structure for the Career Progress Tracker application. The API is currently implemented as a mock service with in-memory database, designed to be easily replaceable with a real backend.

## Architecture

### API Service Layer
- **Location**: `src/services/apiService.js`
- **Purpose**: Centralized API service with in-memory database
- **Features**: 
  - Simulated network delays
  - Error handling
  - CRUD operations for all entities
  - AI content generation simulation

### React Hooks Layer
- **Location**: `src/services/apiHooks.js`
- **Purpose**: Custom React hooks for easy API integration
- **Features**:
  - Loading states
  - Error handling
  - Toast notifications
  - Optimistic updates
  - Caching

### Mock Data
- **Location**: `public/mocked/`
- **Files**:
  - `users.json` - User profiles and data
  - `achievements.json` - Achievement records
  - `documents.json` - Resumes and cover letters
  - `stories.json` - Career stories
  - `interview-questions.json` - Interview preparation questions
  - `notifications.json` - User notifications

## API Endpoints

### Users

#### GET /api/v1/users
Get all users
```javascript
const { data, loading, error } = useApi(() => apiService.getUsers())
```

#### GET /api/v1/users/:id
Get user by ID
```javascript
const { data, loading, error } = useUser(userId)
```

#### PUT /api/v1/users/:id
Update user profile
```javascript
const { updateUser, loading, error } = useUpdateUser()
await updateUser(userId, { name: 'New Name', title: 'New Title' })
```

### Achievements

#### GET /api/v1/achievements
Get all achievements (optionally filtered by userId)
```javascript
const { data, loading, error } = useAchievements(userId)
```

#### POST /api/v1/achievements
Create new achievement
```javascript
const { createAchievement, loading, error } = useCreateAchievement()
await createAchievement({
  userId: '1',
  title: 'Led successful project',
  description: 'Managed team of 5 developers...',
  category: 'work',
  impact: 'high',
  points: 50
})
```

#### PUT /api/v1/achievements/:id
Update achievement
```javascript
const { updateAchievement, loading, error } = useUpdateAchievement()
await updateAchievement(id, { title: 'Updated Title' })
```

#### DELETE /api/v1/achievements/:id
Delete achievement
```javascript
const { deleteAchievement, loading, error } = useDeleteAchievement()
await deleteAchievement(id)
```

### Documents

#### GET /api/v1/documents
Get documents (optionally filtered by userId and type)
```javascript
const { data, loading, error } = useDocuments(userId, 'resume')
```

#### POST /api/v1/documents
Create new document
```javascript
const { createDocument, loading, error } = useCreateDocument()
await createDocument({
  userId: '1',
  title: 'Software Engineer Resume',
  type: 'resume',
  template: 'Modern',
  content: { /* document content */ }
})
```

#### PUT /api/v1/documents/:id
Update document
```javascript
const { updateDocument, loading, error } = useUpdateDocument()
await updateDocument(id, { title: 'Updated Title' })
```

#### DELETE /api/v1/documents/:id
Delete document
```javascript
const { deleteDocument, loading, error } = useDeleteDocument()
await deleteDocument(id)
```

### Stories

#### GET /api/v1/stories
Get stories (optionally filtered by category)
```javascript
const { data, loading, error } = useStories('career-growth')
```

#### POST /api/v1/stories
Create new story
```javascript
const { createStory, loading, error } = useCreateStory()
await createStory({
  userId: '1',
  title: 'My Career Journey',
  content: 'Story content...',
  category: 'career-growth'
})
```

### Interview Questions

#### GET /api/v1/interview-questions
Get interview questions (optionally filtered by category)
```javascript
const { data, loading, error } = useInterviewQuestions('leadership')
```

### Notifications

#### GET /api/v1/notifications
Get user notifications
```javascript
const { data, loading, error } = useNotifications(userId)
```

#### PUT /api/v1/notifications/:id/read
Mark notification as read
```javascript
const { markAsRead, loading, error } = useMarkNotificationAsRead()
await markAsRead(notificationId)
```

### AI Content Generation

#### POST /api/v1/ai/generate
Generate AI content
```javascript
const { generateContent, loading, error } = useAIGenerateContent()
const result = await generateContent('Improve this achievement', 'resume-bullet')
```

### Dashboard

#### GET /api/v1/dashboard/:userId
Get dashboard statistics
```javascript
const { data, loading, error } = useDashboardStats(userId)
```

#### GET /api/v1/progress/:userId
Get user progress data
```javascript
const { data, loading, error } = useUserProgress(userId)
```

## Data Models

### User
```javascript
{
  id: string,
  name: string,
  email: string,
  avatar: string,
  title: string,
  level: number,
  totalPoints: number,
  streak: number,
  achievements: string[],
  skills: string[],
  goals: string[],
  socialLinks: Array<{ label: string, url: string }>,
  createdAt: string,
  updatedAt: string
}
```

### Achievement
```javascript
{
  id: string,
  userId: string,
  title: string,
  description: string,
  category: 'work' | 'learning' | 'leadership' | 'community',
  impact: 'low' | 'medium' | 'high',
  points: number,
  likes: number,
  comments: number,
  date: string,
  createdAt: string,
  updatedAt: string
}
```

### Document
```javascript
{
  id: string,
  userId: string,
  title: string,
  type: 'resume' | 'cover-letter',
  template: string,
  content: object | string,
  createdAt: string,
  updatedAt: string,
  downloads: number,
  rating: number,
  basedOnAchievements: number
}
```

### Story
```javascript
{
  id: string,
  userId: string,
  title: string,
  content: string,
  category: string,
  likes: number,
  views: number,
  createdAt: string,
  author: {
    name: string,
    avatar: string,
    title: string
  }
}
```

### Interview Question
```javascript
{
  id: string,
  question: string,
  category: string,
  difficulty: 'easy' | 'medium' | 'hard',
  basedOnAchievement: string,
  suggestedAnswer: string,
  keyPoints: string[],
  createdAt: string
}
```

### Notification
```javascript
{
  id: string,
  userId: string,
  title: string,
  message: string,
  type: string,
  read: boolean,
  createdAt: string
}
```

## Error Handling

All API calls include comprehensive error handling:

```javascript
const { data, loading, error, refetch } = useApi(apiCall)

if (loading) return <LoadingSpinner />
if (error) return <ErrorMessage error={error} />
if (!data) return <NoDataMessage />

// Use data safely
return <Component data={data} />
```

## Caching

The API includes a caching system:

```javascript
const { getCachedData, setCachedData, clearCache } = useApiCache()

// Check cache first
const cached = getCachedData('achievements')
if (cached) return cached

// Fetch and cache
const data = await apiService.getAchievements()
setCachedData('achievements', data)
```

## Optimistic Updates

For better UX, use optimistic updates:

```javascript
const { optimisticUpdate, loading } = useOptimisticUpdate(
  apiService.updateAchievement,
  (data) => {
    // Optimistically update UI
    setAchievements(prev => prev.map(a => 
      a.id === data.id ? data : a
    ))
  },
  (error) => {
    // Revert on error
    refetch()
  }
)
```

## Real-time Updates

Simulated real-time updates:

```javascript
useRealtimeUpdates(userId, () => {
  // Refetch data when updates are available
  refetch()
})
```

## Migration to Real Backend

To replace the mock API with a real backend:

1. **Update API Service**: Replace `apiService.js` with real HTTP calls
2. **Environment Variables**: Add API base URL configuration
3. **Authentication**: Add token management and auth headers
4. **Error Handling**: Update error handling for real HTTP status codes
5. **Real-time**: Replace simulated updates with WebSocket/SSE

### Example Real API Service

```javascript
class RealApiService {
  constructor() {
    this.baseUrl = process.env.REACT_APP_API_URL
    this.token = localStorage.getItem('token')
  }

  async apiCall(endpoint, options = {}) {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      headers: {
        'Authorization': `Bearer ${this.token}`,
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
    })

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }

    return response.json()
  }
}
```

## Testing

The mock API includes simulated network delays and occasional errors for testing:

- **Network Delays**: 200-700ms random delays
- **Error Simulation**: 5% chance of network errors
- **AI Processing**: 2-5 second delays for AI content generation

## Performance Considerations

- **Caching**: 5-minute cache for frequently accessed data
- **Optimistic Updates**: Immediate UI updates with rollback on error
- **Lazy Loading**: Load data only when needed
- **Pagination**: Support for paginated responses (can be implemented)

## Security Notes

When migrating to a real backend:

1. **Authentication**: Implement JWT or session-based auth
2. **Authorization**: Add role-based access control
3. **Input Validation**: Validate all user inputs
4. **Rate Limiting**: Implement API rate limiting
5. **HTTPS**: Use HTTPS for all API communications
6. **CORS**: Configure CORS properly for production

## Future Enhancements

1. **WebSocket Support**: Real-time notifications and updates
2. **File Upload**: Resume/CV file upload and storage
3. **Search**: Full-text search across achievements and stories
4. **Analytics**: User behavior and engagement analytics
5. **Export**: PDF export for resumes and achievements
6. **Integration**: LinkedIn, GitHub, and other platform integrations
