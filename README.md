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
      console.log('Connected users LIST IN COMPONEND:', userList);
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
