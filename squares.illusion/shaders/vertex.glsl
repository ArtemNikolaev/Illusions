#version 300 es

void main() {
    const vec2 positions[6] = vec2[](
        vec2(-1.0, 1.0),
        vec2(1.0, 1.0),
        vec2(1.0, -1.0),
        vec2(-1.0, 1.0),
        vec2(1.0, -1.0),
        vec2(-1.0, -1.0)
    );
    gl_Position = vec4(positions[gl_VertexID], 0, 1);
}
