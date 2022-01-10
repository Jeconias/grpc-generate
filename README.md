#### GRPC Generate

- Install [protobuf](https://github.com/protocolbuffers/protobuf/tree/v3.19.2);
- Configure the `grpc.generate.config.json` in your project;

  - Example:

  ```json
  {
    "github": {
      "repo": "repository with yours .proto files to clone",
      "token": "Personal Token <only if repository is private>",
      "isPrivate": false
    }
  }
  ```

- Use `npm install -g grpc-generate` or `npx grpc-generate` to run CLI;
