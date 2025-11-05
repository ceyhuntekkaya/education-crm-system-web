# Mesajlar API Entegrasyonu - Özet Rapor

## 📋 Genel Bakış

Mesajlar modülü, brands modülündeki mimari yapı örnek alınarak yeniden yapılandırılmıştır. Artık gerçek API ile çalışmakta ve kullanıcıya özel mesajları göstermektedir.

## 🔧 Yapılan Değişiklikler

### 1. API Endpoints Güncelleme

**Dosya:** `src/lib/api/endpoints.ts`

Yeni endpoint'ler eklendi:

```typescript
CONTENT: {
  // Messages
  MESSAGES_BY_USER: (userId: string | number) =>
    `/content/messages/user/${userId}`,
  MESSAGE_MARK_AS_READ: (messageId: string | number) =>
    `/content/messages/${messageId}/read`,
  // ... diğer endpoint'ler
}
```

### 2. Message API Service

**Dosya:** `src/app/(public)/messages/services/message-api.ts` ✨ YENİ

API isteklerini yöneten servis katmanı oluşturuldu:

```typescript
// Kullanıcıya ait mesajları getir
export const fetchMessagesByUser = async (userId: string | number)

// Mesajı okundu olarak işaretle
export const markMessageAsRead = async (messageId: string | number)
```

### 3. Use Messages Hook Güncelleme

**Dosya:** `src/app/(public)/messages/hooks/use-messages.ts`

Mock data kullanımından gerçek API kullanımına geçildi:

**Önceki Yapı:**
- Mock data ile çalışıyordu
- Filtreler client-side yapılıyordu
- Simüle edilmiş loading durumu

**Yeni Yapı:**
- `useGet` hook'u ile gerçek API çağrısı
- `userId` parametresi ile kullanıcıya özel mesajlar
- Otomatik loading ve error yönetimi

```typescript
export const useMessages = ({
  userId,
  enabled = true,
}: UseMessagesProps): UseMessagesReturn => {
  const {
    data: messagesResponse,
    loading: messageLoading,
    error: messageError,
    refetch: refetchMessages,
  } = useGet<ApiResponseDto<MessageDto[]>>(
    userId ? API_ENDPOINTS.CONTENT.MESSAGES_BY_USER(userId) : null,
    { enabled: enabled && !!userId }
  );

  return {
    messages: messagesResponse?.data || [],
    messageLoading,
    messageError,
    refetchMessages,
  };
};
```

### 4. Mark Message As Read Hook

**Dosya:** `src/app/(public)/messages/hooks/use-mark-message-as-read.ts` ✨ YENİ

Mesajı okundu olarak işaretleyen hook:

```typescript
export const useMarkMessageAsRead = (): UseMarkMessageAsReadReturn => {
  const { mutate, loading, error } = usePut<
    ApiResponseDto<MessageDto>,
    { messageId: string | number }
  >((variables) => API_ENDPOINTS.CONTENT.MESSAGE_MARK_AS_READ(variables.messageId));

  const markAsRead = async (messageId: string | number) => {
    const result = await mutate({ messageId });
    return result?.data || null;
  };

  return { markAsRead, markingAsRead: loading, markAsReadError: error };
};
```

### 5. Messages Context Güncelleme

**Dosya:** `src/app/(public)/messages/context/use-messages-context.tsx`

Context, auth ve mesaj işaretleme entegrasyonu ile güncellendi:

**Eklenen Özellikler:**

1. **Auth Entegrasyonu:**
   ```typescript
   const { user } = useAuth();
   ```

2. **Kullanıcı ID'sine göre mesaj çekme:**
   ```typescript
   const { messages, messageLoading, messageError, refetchMessages } = useMessages({
     userId: user?.id,
     enabled: !!user?.id,
   });
   ```

3. **Otomatik mesaj okuma:**
   ```typescript
   const handleMessageSelect = useCallback(async (message: MessageDto) => {
     setSelectedMessage(message);
     
     // Mesaj henüz okunmadıysa, okundu olarak işaretle
     if (message.id && message.status !== "READ") {
       try {
         await markAsRead(message.id);
         refetchMessages();
       } catch (error) {
         console.error("Mesaj okundu olarak işaretlenemedi:", error);
       }
     }
   }, [markAsRead, refetchMessages]);
   ```

4. **Context Type Güncellemesi:**
   ```typescript
   markAsRead: (messageId: string | number) => Promise<MessageDto | null>;
   ```

### 6. Message Handlers Güncelleme

**Dosya:** `src/app/(public)/messages/hooks/use-message-handlers.ts`

Handler'lar basitleştirildi:

```typescript
const onViewDetails = useCallback((message: MessageDto) => {
  // setSelectedMessage otomatik olarak mesajı okundu işaretleyecek
  setSelectedMessage(message);
  detailModal.open();
}, [setSelectedMessage, detailModal]);

const onMarkAsRead = useCallback(async (message: MessageDto) => {
  // setSelectedMessage otomatik olarak mesajı okundu işaretleyecek
  setSelectedMessage(message);
}, [setSelectedMessage]);
```

## 🎯 Mimari Yapı

### Klasör Yapısı

```
messages/
├── services/
│   └── message-api.ts          # API servis katmanı
├── hooks/
│   ├── use-messages.ts         # Mesaj listesi hook'u
│   ├── use-mark-message-as-read.ts  # Mesaj okuma hook'u
│   ├── use-message-handlers.ts # Event handler'ları
│   └── index.ts
├── context/
│   └── use-messages-context.tsx # Context yönetimi
├── types/
│   └── message-context-types.ts # Type tanımları
└── ...
```

### Veri Akışı

```
1. Kullanıcı giriş yapar (useAuth)
   ↓
2. MessageProvider user.id'yi alır
   ↓
3. useMessages hook'u API'den mesajları çeker
   ↓
4. Mesajlar DataGrid'de gösterilir
   ↓
5. Kullanıcı bir mesaja tıklar
   ↓
6. handleMessageSelect çalışır
   ↓
7. Mesaj "READ" değilse → markAsRead API'si çağrılır
   ↓
8. Mesajlar yenilenir (refetchMessages)
   ↓
9. Modal açılır ve detaylar gösterilir
```

## 🔄 API Endpoint'leri

### 1. Kullanıcı Mesajlarını Getir
```
GET /api/content/messages/user/{userId}
Response: ApiResponseDto<MessageDto[]>
```

### 2. Mesajı Okundu Olarak İşaretle
```
PUT /api/content/messages/{messageId}/read
Response: ApiResponseDto<MessageDto>
```

## ✅ Özellikler

1. ✅ Kullanıcıya özel mesaj listesi
2. ✅ Auth context entegrasyonu
3. ✅ Otomatik "okundu" işaretleme
4. ✅ Gerçek API entegrasyonu
5. ✅ Loading ve error yönetimi
6. ✅ Brands modülü ile tutarlı mimari
7. ✅ Type-safe yapı
8. ✅ Temiz kod organizasyonu

## 🎨 Kullanım Örneği

```tsx
import { MessageProvider, useMessageContext } from './context';

// Provider ile sarmalama
<MessageProvider>
  <Messages />
</MessageProvider>

// Component içinde kullanım
function Messages() {
  const {
    messages,        // Kullanıcıya özel mesajlar
    loading,         // Yüklenme durumu
    error,           // Hata durumu
    markAsRead,      // Mesajı okundu işaretle
    refreshMessages, // Mesajları yenile
  } = useMessageContext();

  // ...
}
```

## 📝 Notlar

1. **Auth Dependency:** Mesajlar kullanıcı ID'sine bağlı olduğu için, kullanıcı giriş yapmamışsa mesajlar yüklenmez.

2. **Otomatik Okuma:** Modal açıldığında veya mesaj seçildiğinde, eğer mesaj daha önce okunmamışsa otomatik olarak "READ" statüsüne geçer.

3. **Brands Mimarisi:** Tüm yapı brands modülündeki context, hooks ve servis katmanı mimarisini takip eder.

4. **Error Handling:** Tüm API çağrılarında hata yönetimi mevcuttur ve kullanıcıya uygun şekilde gösterilir.

## 🚀 Sonraki Adımlar

- [ ] Mesaj filtreleme özelliği ekleme
- [ ] Mesaj silme özelliği
- [ ] Mesaj yanıtlama özelliği
- [ ] Toplu mesaj işlemleri
- [ ] Real-time güncellemeler (WebSocket)

## 📚 İlgili Dosyalar

- `src/lib/api/endpoints.ts`
- `src/app/(public)/messages/services/message-api.ts`
- `src/app/(public)/messages/hooks/use-messages.ts`
- `src/app/(public)/messages/hooks/use-mark-message-as-read.ts`
- `src/app/(public)/messages/context/use-messages-context.tsx`
- `src/app/(public)/messages/types/message-context-types.ts`
