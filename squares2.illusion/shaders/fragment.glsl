#version 300 es
precision mediump float;

uniform vec4 u_bckg_color;
uniform vec4 u_line_color;
uniform vec4 u_square_color;
uniform int u_width;
uniform int u_height;
uniform int u_radius;
uniform int u_segment_size;
out vec4 outColor;
float line_segments = 1.0;
float square_width_segments = 40.0;
float square_height_segments = 10.0;

vec2 setXY() {
    float xDistance = abs(float(u_width) / 2.0 - gl_FragCoord.x);
    float yDistance = abs(float(u_height) / 2.0 - gl_FragCoord.y);

    return pow(xDistance,2.0) + pow(yDistance,2.0) > pow(float(u_radius), 2.0) ?
        gl_FragCoord.xy : gl_FragCoord.yx;
}
bool itsLine (vec2 xy, float line_size, float square_width, float square_height) {
    float line_vert_ptrn = line_size + square_height;
    float line_hor_ptrn = line_size + square_width;
    bool itsLine =
        // check horizontal line
        mod(xy.y, line_vert_ptrn) <= line_size ||
        // check vertical line
        mod(xy.x, line_hor_ptrn) <= line_size;

    return itsLine;
}
bool itsSquare(vec2 xy, float line_size, float square_width, float square_height) {
    // it's not a line, so we can minus first line on x and y axis
   xy = vec2(xy.x - line_size, xy.y - line_size);

    float sqr_vert_odd = mod(xy.y, line_size * 2.0 + square_height * 2.0);
    float sqr_hor_odd = mod(xy.x, line_size * 2.0 + square_width * 2.0);

    float sqr_vert_even = sqr_vert_odd - (line_size + square_height);
    float sqr_hor_even = sqr_hor_odd - (line_size + square_width);

    bool itsSquare =
        (
            // check vertical line
            sqr_vert_odd <= float (square_height) &&
            // check horizontal line
            sqr_hor_odd <= float (square_width)
        )
            ||
        (
            sqr_vert_even > 0.0 &&
            sqr_vert_even < square_height &&
            sqr_hor_even > 0.0 &&
            sqr_hor_even < square_width
        )
    ;

    return itsSquare;
}

void main() {
    vec2 xy = setXY();

    float line_size = float(u_segment_size) * line_segments;
    float square_width = float(u_segment_size) * square_width_segments;
    float square_height = float(u_segment_size) * square_height_segments;

    if (itsLine(xy, line_size, square_width, square_height)) {
        outColor = u_line_color;
        return;
    }

    if (itsSquare(xy, line_size, square_width, square_height)) {
        outColor = u_square_color;
        return;
    }

    outColor = u_bckg_color;
}
