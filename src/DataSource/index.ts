/**
 * 接口组合：
 * 1. C
 * 2. R
 * 3. U
 * 4. D
 * 5. Others
 */

const dataSourceConfig = {
  uuid: 'uuid001',

  name: '用户管理',
  description: '这是一组管理用户的接口，包括：1.用户创建；2.用户列表查询；3.用户信息更新；4.用户删除；5.VIP 用户标记',

  create: [
    {
      name: '用户创建',
      description: '用户创建',
      request: {
        path: '/user/add',
        method: 'POST',
      },
      input: {
        name: 'string',
        gender: 'string',
        age: 'number',
      },
      output: {},
    },
  ],

  read: [
    {
      name: '用户读取',
      description: '用户读取',
      request: {
        path: '/user/read',
        method: 'POST',
      },
      input: {
        isArrayOfObjects: false,
        element: {
          name: 'string',
          gender: 'string',
          age: 'number',
          isVip: 'boolean',
        },
      },
      output: {
        isArrayOfObjects: true,
        element: {
          id: 'string',
          name: 'string',
          gender: 'string',
          age: 'number',
          isVip: 'boolean',
        },
      },
    },
  ],

  update: [
    {
      name: '用户更新',
      description: '用户更新',
      request: {
        path: '/user/update',
        method: 'POST',
      },
      input: {
        isArrayOfObjects: false,
        element: {
          id: 'string',
          name: 'string',
          gender: 'string',
          age: 'number',
          isVip: 'boolean',
        },
      },
      output: {},
    },
  ],

  delete: [
    {
      name: '用户删除',
      description: '用户删除',
      request: {
        path: '/user/delete',
        method: 'POST',
      },
      input: {
        isArrayOfObjects: false,
        element: {
          id: 'string',
        },
      },
    },
  ],

  others: [
    {
      name: '升级会员',
      description: '升级会员',
      request: {
        path: '/user/vip',
        method: 'POST',
      },
      input: {
        isArrayOfObjects: false,
        element: {
          id: 'string',
        },
      },
    },
  ],
}

const structure = [
  {
    name: '新增用户接口',
    path: '/user/add',
    input: {},
    output: {},
  },
]

/**
 * 基于 swagger json 生成的 DATA_CONFIG
 */

const AI_DATA_CONFIG = [
  {
    name: 'Add User',
    path: '/user/add',
    method: 'POST',
    description: 'Add User',
    authRequired: false,
    authType: 'None',
    request: {
      headers: {},
      pathParams: {},
      queryParams: {},
      body: {
        contentType: 'application/json',
        schema: {
          type: 'object',
          title: 'UserInput',
          required: ['name', 'gender', 'age'],
          properties: {
            name: { type: 'string', title: 'Name' },
            gender: { type: 'string', title: 'Gender' },
            age: { type: 'integer', title: 'Age' },
          },
        },
      },
    },
    response: {
      200: {
        description: 'Successful Response',
        schema: {},
      },
      422: {
        description: 'Validation Error',
        schema: { $ref: '#/components/schemas/HTTPValidationError' },
      },
    },
  },
  {
    name: 'Read Users',
    path: '/user/read',
    method: 'POST',
    description: 'Read Users',
    authRequired: false,
    authType: 'None',
    request: {
      headers: {},
      pathParams: {},
      queryParams: {},
      body: {
        contentType: 'application/json',
        schema: {
          type: 'object',
          title: 'UserQuery',
          properties: {
            name: {
              anyOf: [
                { type: 'string' },
                { type: 'null' },
              ],
              title: 'Name',
            },
            ageMin: {
              anyOf: [
                { type: 'integer' },
                { type: 'null' },
              ],
              title: 'Agemin',
            },
            ageMax: {
              anyOf: [
                { type: 'integer' },
                { type: 'null' },
              ],
              title: 'Agemax',
            },
            gender: {
              anyOf: [
                { type: 'string' },
                { type: 'null' },
              ],
              title: 'Gender',
            },
            isVip: {
              anyOf: [
                { type: 'boolean' },
                { type: 'null' },
              ],
              title: 'Isvip',
            },
          },
        },
      },
    },
    response: {
      200: {
        description: 'Successful Response',
        schema: {
          type: 'array',
          title: 'Response Read Users User Read Post',
          items: { $ref: '#/components/schemas/UserOutput' },
        },
      },
      422: {
        description: 'Validation Error',
        schema: { $ref: '#/components/schemas/HTTPValidationError' },
      },
    },
  },
  {
    name: 'Get User',
    path: '/user/{id}',
    method: 'GET',
    description: 'Get User',
    authRequired: false,
    authType: 'None',
    request: {
      headers: {},
      pathParams: {
        id: { type: 'integer', title: 'Id', required: true, description: '资源的唯一标识符' },
      },
      queryParams: {},
      body: {},
    },
    response: {
      200: {
        description: 'Successful Response',
        schema: { $ref: '#/components/schemas/UserOutput' },
      },
      422: {
        description: 'Validation Error',
        schema: { $ref: '#/components/schemas/HTTPValidationError' },
      },
    },
  },
  {
    name: 'Soft Delete User',
    path: '/user/{id}',
    method: 'DELETE',
    description: 'Soft Delete User',
    authRequired: false,
    authType: 'None',
    request: {
      headers: {},
      pathParams: {
        id: { type: 'integer', title: 'Id', required: true, description: '资源的唯一标识符' },
      },
      queryParams: {},
      body: {},
    },
    response: {
      200: {
        description: 'Successful Response',
        schema: {},
      },
      422: {
        description: 'Validation Error',
        schema: { $ref: '#/components/schemas/HTTPValidationError' },
      },
    },
  },
  {
    name: 'Update User',
    path: '/user/{id}',
    method: 'PUT',
    description: 'Update User',
    authRequired: false,
    authType: 'None',
    request: {
      headers: {},
      pathParams: {
        id: { type: 'integer', title: 'Id', required: true, description: '资源的唯一标识符' },
      },
      queryParams: {},
      body: {
        contentType: 'application/json',
        schema: {
          type: 'object',
          title: 'UserUpdate',
          properties: {
            name: {
              anyOf: [
                { type: 'string' },
                { type: 'null' },
              ],
              title: 'Name',
            },
            gender: {
              anyOf: [
                { type: 'string' },
                { type: 'null' },
              ],
              title: 'Gender',
            },
            age: {
              anyOf: [
                { type: 'integer' },
                { type: 'null' },
              ],
              title: 'Age',
            },
            isVip: {
              anyOf: [
                { type: 'boolean' },
                { type: 'null' },
              ],
              title: 'Isvip',
            },
          },
        },
      },
    },
    response: {
      200: {
        description: 'Successful Response',
        schema: {},
      },
      422: {
        description: 'Validation Error',
        schema: {
          $ref: '#/components/schemas/HTTPValidationError',
        },
      },
    },
  },
]

/**
 * LLMs 返回的格式模板
 */

const STRUCTURE_DEMO = [
  {
    name: '接口名称',
    path: '/api/example',
    method: 'GET/POST/PUT/DELETE',
    description: '接口的功能描述，例如获取用户信息或更新数据。',
    authRequired: true,
    authType: 'Bearer Token / API Key / None',
    request: {
      headers: {
        Authorization: { type: 'string', description: '身份认证 Token，格式：Bearer {token}' },
      },
      pathParams: {
        id: { type: 'integer', title: 'Id', required: true, description: '资源的唯一标识符' },
      },
      queryParams: {
        filter: { type: 'string', description: '用于过滤查询结果的关键字' },
      },
      body: {
        contentType: 'application/json',
        schema: {
          type: 'object',
          title: 'RequestBody',
          required: ['field1', 'field2'],
          properties: {
            field1: { type: 'string', title: '字段1', description: '请求的主要字段' },
            field2: { type: 'integer', title: '字段2', description: '附加数值字段' },
          },
        },
      },
    },
    response: {
      200: {
        description: '成功的响应',
        schema: {
          type: 'object',
          properties: {
            data: { type: 'array', items: { type: 'object' } },
            message: { type: 'string', description: '操作结果描述' },
          },
        },
        example: {
          data: [{ id: 1, name: '示例数据' }],
          message: '请求成功',
        },
      },
      400: {
        description: '请求参数错误',
        schema: {
          type: 'object',
          properties: {
            error: { type: 'string', description: '错误信息' },
          },
        },
      },
      401: {
        description: '身份认证失败',
        schema: {
          type: 'object',
          properties: {
            error: { type: 'string', description: '无效的 Token' },
          },
        },
      },
      422: {
        description: '数据验证失败',
        schema: {
          type: 'object',
          title: 'ValidationError',
          properties: {
            detail: { type: 'array', items: { type: 'object' } },
          },
        },
      },
    },
  },
]

export {
  AI_DATA_CONFIG,
  STRUCTURE_DEMO,
}
