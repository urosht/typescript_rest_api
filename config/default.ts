export default {
    port: 1337,
    dbUri: "mongodb://localhost:27017/rest-api",
    saltWorkFactor: 10,
    accessTokenTtl: "15m",
    refreshTokenTtl: "1y",
    publicKey: `-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCowwW0q2n/fPXVkHj2jrPXUX5a
ZAOfgE6HrIr+5/f4KJfZNL9+wb4TOeSsU5Ej2m2VbjExITjE4Q3ZnhWIr9iJnu/0
WLM9ILG8qvPNOyglz9vgYfLQUIuaGDql5wlAGrsbqcduJCiYor/immPIxlwkYLcV
QqK15ZgQni1IxLUBlwIDAQAB
-----END PUBLIC KEY-----`,
    privateKey: `-----BEGIN RSA PRIVATE KEY-----
MIICXQIBAAKBgQCowwW0q2n/fPXVkHj2jrPXUX5aZAOfgE6HrIr+5/f4KJfZNL9+
wb4TOeSsU5Ej2m2VbjExITjE4Q3ZnhWIr9iJnu/0WLM9ILG8qvPNOyglz9vgYfLQ
UIuaGDql5wlAGrsbqcduJCiYor/immPIxlwkYLcVQqK15ZgQni1IxLUBlwIDAQAB
AoGAMYFsNhCmuozUrL6BzYoVFY/RagC2015XKxOhfp9brY9y5APGPQ/mi0tLWoX1
KLhVtyUpBwmA1rhSUMk/9eXnthOMYzJO+7RzUhvUKip320YLyiGphC53RVwq542o
SIx5y6YcQxB+J9aZ/tbn7qp6R7HViACOqQ/bxHh7YA8gjtECQQD2t7TwFFKvuzN5
vZsimoUeOZgbjIQsHWEbqFjtAYU3hTQtGckyxyQBc/QNKDB5sFhihvPJiJctov1q
LjgHuUiZAkEArxx5UvCfX4udRVCx0INuXFgYt7JfsL+cvoPzI7Ygen0u4BVY0ZDb
Kp0FN4HouP9Wz4aX+/Z6Z9ZWWjO1qdcJrwJBAPXC659Xb0KUROOZZybiK4Z/MrEG
mUbkgS4u1V5J7Gzw6JegnxZQ3uH/onVUum0NqA2FhuUThhy0xqD1p2SyQckCQQCX
Lxg4WXLfxORFogPDKJYxuAWvI5umN+iWO8nBvU6RMl80LHoAhPYT9nk4kTph7mH+
zg+OBCFuYQkw25AuUHAVAkA+CqmtqRPI6GWbEEvYqVKCW2ZbwlFi5Z/bQ/fdzh7i
v4jBoqHbgmO31w+tlDZ60pqqwJzpOu9stn+oPqMfRllm
-----END RSA PRIVATE KEY-----`
}