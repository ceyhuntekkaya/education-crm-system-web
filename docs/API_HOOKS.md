# API Hook Sistemi

Bu proje için oluşturulmuş temiz ve düzenli API hook sistemi.

## Klasör Yapısı

```
src/
  hooks/
    api/
      index.ts          # Tüm API hook'ları export
      useApi.ts         # Ana API hook (temel)
      useGet.ts         # GET istekleri
      usePost.ts        # POST istekleri  
      usePut.ts         # PUT/PATCH istekleri
      useDelete.ts      # DELETE istekleri
      types.ts          # API hook tipleri
      examples.tsx      # Kullanım örnekleri
  lib/
    api/
      index.ts          # API lib export
      client.ts         # Axios client yapılandırması
      endpoints.ts      # API endpoint'leri
      types.ts          # API response tipleri
```

## Özellikler

### ✅ Ana Özellikler
- **Type-safe**: Tam TypeScript desteği
- **Otomatik loading/error yönetimi**: Her hook kendi state'ini yönetir
- **Token yönetimi**: Otomatik JWT token ekleme ve yenileme
- **Request/Response interceptor**: Merkezi hata yönetimi
- **Pagination desteği**: useGetPaginated hook'u
- **Form entegrasyonu**: usePostForm hook'u
- **Caching**: Response caching (isteğe bağlı)

### 🔧 Kullanılabilir Hook'lar

#### 1. useGet - GET İstekleri
```tsx
const { data, loading, error, refetch } = useGet<User[]>('/api/users');
```

#### 2. usePost - POST İstekleri  
```tsx
const { mutate, loading, error } = usePost<User, CreateUserRequest>('/api/users');
```

#### 3. usePut - PUT İstekleri
```tsx
const { mutate, loading } = usePut<User, UpdateUserRequest>(
  (data) => `/api/users/${data.id}`
);
```

#### 4. useDelete - DELETE İstekleri
```tsx
const { deleteById, loading } = useDeleteById<{success: boolean}>('/api/users');
```

## Hızlı Başlangıç

### 1. Environment Variables
`.env.local` dosyasına API URL'ini ekleyin:
```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

### 2. Basit GET İsteği
```tsx
import { useGet } from '@/hooks/api';

const UserList = () => {
  const { data: users, loading, error } = useGet<User[]>('/api/users');
  
  if (loading) return <div>Yükleniyor...</div>;
  if (error) return <div>Hata: {error}</div>;
  
  return (
    <ul>
      {users?.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
};
```

### 3. Form ile POST İsteği
```tsx
import { usePostForm } from '@/hooks/api';

const CreateUserForm = () => {
  const { submitForm, loading, error } = usePostForm<CreateUserRequest, User>(
    '/api/users',
    {
      onSuccess: (user) => alert(`Kullanıcı oluşturuldu: ${user.name}`),
      resetOnSuccess: true
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    
    submitForm({
      name: formData.get('name') as string,
      email: formData.get('email') as string,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" placeholder="İsim" required />
      <input name="email" type="email" placeholder="Email" required />
      
      <button type="submit" disabled={loading}>
        {loading ? 'Oluşturuluyor...' : 'Oluştur'}
      </button>
      
      {error && <p style={{color: 'red'}}>{error}</p>}
    </form>
  );
};
```

### 4. Conditional GET (Koşullu)
```tsx
const userId = '123';
const { data: user } = useGet<User>(
  userId ? `/api/users/${userId}` : null,
  { enabled: !!userId }
);
```

### 5. Pagination
```tsx
const { 
  data, 
  loading, 
  goToPage, 
  nextPage, 
  prevPage 
} = useGetPaginated<User[]>(
  '/api/users',
  { page: 1, limit: 10 }
);
```

## API Endpoints

`API_ENDPOINTS` objesi ile endpoint'lerinizi merkezi olarak yönetin:

```tsx
import { API_ENDPOINTS } from '@/lib/api/endpoints';

// Kullanım
const { data } = useGet<User[]>(API_ENDPOINTS.USERS.LIST);
const { data: user } = useGet<User>(API_ENDPOINTS.USERS.BY_ID('123'));
```

## Error Handling

### Otomatik Error Handling
```tsx
const { data, error } = useGet<User[]>('/api/users', {
  onError: (error) => {
    console.error('API Hatası:', error);
    // Toast notification göster
  }
});
```

### Manual Error Handling
```tsx
const { mutateAsync } = usePost<User, CreateUserRequest>('/api/users');

const handleCreate = async () => {
  try {
    const user = await mutateAsync(userData);
    console.log('Başarılı:', user);
  } catch (error) {
    console.error('Hata:', error);
  }
};
```

## Authentication

Token otomatik olarak localStorage'dan alınır ve isteklere eklenir:

```tsx
// Login sonrası
const { mutate: login } = usePost<LoginResponse, LoginRequest>('/api/auth/login', {
  onSuccess: (data) => {
    localStorage.setItem('auth_token', data.token);
    // Otomatik olarak sonraki isteklerde kullanılır
  }
});
```

## Best Practices

### 1. Type Safety
Her zaman response tipini belirtin:
```tsx
const { data } = useGet<User[]>('/api/users'); // ✅ Good
const { data } = useGet('/api/users'); // ❌ Bad
```

### 2. Error Handling
Her hook için error handling ekleyin:
```tsx
const { data, error } = useGet<User[]>('/api/users', {
  onError: (error) => showToast(error)
});
```

### 3. Loading States
UI'da loading state'lerini gösterin:
```tsx
const { data, loading } = useGet<User[]>('/api/users');

if (loading) return <Spinner />;
```

### 4. Conditional Requests
Gereksiz istekleri önleyin:
```tsx
const { data } = useGet<User>(
  userId ? `/api/users/${userId}` : null,
  { enabled: !!userId }
);
```

## Gelişmiş Kullanım

### Custom Options
```tsx
const { data } = useGet<User[]>('/api/users', {
  enabled: true,
  params: { page: 1, limit: 10 },
  onSuccess: (data) => console.log('Başarılı'),
  onError: (error) => console.error('Hata'),
  onFinally: () => console.log('Tamamlandı')
});
```

### Dynamic URLs
```tsx
const { mutate } = usePut<User, UpdateUserRequest>(
  (data) => `/api/users/${data.id}`,
  {
    onSuccess: (user) => console.log('Güncellendi:', user)
  }
);
```

Bu sistem projenizin API ihtiyaçlarını temiz ve düzenli bir şekilde karşılayacaktır.
