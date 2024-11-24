# Enhanced Yjs WebSocket Server

A customized WebSocket server implementation for Yjs, built on top of the standard y-websocket provider with additional features for user authentication, connection monitoring, and real-time user presence tracking.

### Features

- **Authentication Support**: Built-in JWT authentication with both cookie and query parameter token support
- **User Presence Tracking**: Real-time tracking of connected users with additional metadata
- **Connection Monitoring**: Integrated WebSocket connection monitoring service
- **Extended Client Data**: Support for custom additional data per client connection
- **Fastify Integration**: Seamlessly works with Fastify's WebSocket plugin

### Key Enhancements

This implementation extends the standard Yjs WebSocket server with:

1. **User Authentication**

   - JWT token validation
   - Flexible token delivery (cookies or query parameters)
   - Automatic unauthorized connection handling

2. **Enhanced Client Tracking**

   - Unique client identification
   - Custom metadata support per connection
   - Real-time user list updates

3. **Monitoring Capabilities**
   - Connection tracking by document
   - User metadata storage
   - Connection timing information

### Authentication

The server accepts authentication tokens in two ways:

1. Via `accessToken` cookie
2. Via `token` query parameter

If authentication fails, the connection is automatically closed with code 1008 (Policy Violation).

### Modified Features from Standard y-websocket

1. **Extended Client Management**

   - Added `connectedClients` Map to store client metadata
   - Enhanced client disconnection handling
   - Real-time user list updates

2. **Custom Message Types**

   - Added `messageUserList` (type 100) for user presence updates
   - Enhanced message handling for user list synchronization

3. **Connection Monitoring**
   - Integration with `socketMonitor` service
   - Connection timing tracking
   - Document-based connection management

#### Client usage example

```typescript
export function createWebsocketProvider(
  id: string,
  yjsDocMap: Map<string, Y.Doc>,
  jwt: string,
): Provider {
  const doc = getDocFromMap(id, yjsDocMap);

  const inst = new WebsocketProvider('ws://localhost:1234/ws', id, doc, {
    connect: true,
    params: {
      token: jwt,
      additionalData: JSON.stringify({
        whatever: 'you want',
        color: 'black',
        anyOther: 'property',
        name: 'test'
      })
    }
  });

  inst.messageHandlers[100] = (
    _encoder: Encoder,
    decoder: decoding.Decoder,
    _provider: WebsocketProvider,
    _emitSynced: boolean,
    _messageType: number
  ) => {

    const userListJson = decoding.readVarString(decoder)
    const userList = JSON.parse(userListJson)

    console.log('Received user list:', userList)
    inst.emit('customUserList', [{ userList }])
  }


  // @ts-ignore
  return inst;
}

...

const providerFactory = useCallback(
  (id: string, yjsDocMap: Map<string, Y.Doc>) => {
    const provider = createWebsocketProvider(id, yjsDocMap, jwt);
    // @ts-ignore
    provider.on('customUserList', ({ userList }) => {
      console.log('Connected users LIST IN COMPONENT:', userList);
    });
    setTimeout(() => setYjsProvider(provider), 0);

    return provider;
  },
  [jwt, docId],
);

...


<LexicalComposer initialConfig={editorConfig}>
  <CollaborationPlugin
    id={docId}
    providerFactory={providerFactory}
    ...
  />
  <Editor />
</LexicalComposer>
```

#### To return the version on a server request.

Example of a request using curl or Postman:

```
curl http://localhost:1234/
```

The expected response should be:

```
WebSocket server is running!
Version: v1.0.0
```
