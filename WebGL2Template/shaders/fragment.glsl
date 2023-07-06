#version 300 es
precision mediump float;

uniform int u_row;
uniform int u_width;
uniform int u_height;
uniform vec4 u_bckg_color;
uniform vec4 u_line_color;
uniform vec4 u_square_color;
out vec4 outColor;
int line_segments = 1;
int square_segments = 20;
int square_plus_border_segments = 22;
int square_plus_border_plus_empty = 42;
int horizontal_indent = 5;

void main() {
    int segments_amount = (line_segments + square_segments) * u_row + line_segments;
    int segment_height = int(round(float(u_height) / float(segments_amount)));

    int line_height = line_segments * segment_height;
    int square_height = square_segments * segment_height;

    int all_segments_height = segments_amount * segment_height;
    int unused_height = u_height - all_segments_height;

    int height_indent = int(round(float(unused_height) / 2.0));

    int pixel_height = u_height - abs(int(gl_FragCoord.y) - u_height);

    int coord_without_indent = int(gl_FragCoord.y - float(height_indent));
    int coord_without_height = int(mod(float(coord_without_indent), float(line_height + square_height)));

    int current_row = coord_without_indent <= 0 ? 0 :
        int(floor(float(coord_without_indent) / float(square_height + line_height))) + 1;

    if (coord_without_height <= line_height) {
        outColor = u_line_color;
    } else {
        int current_pattern = int(mod(float(current_row), 4.0));
        int indent;
        switch (current_pattern) {
            case 0:
                indent = segment_height * 5;
                break;
            case 1:
                indent = segment_height * 10;
                break;
            case 2:
                indent = segment_height * 15;
                break;
            case 3:
                indent = segment_height * 10;
                break;
        }

        int width_without_indent = int(gl_FragCoord.x) - indent;
        int width_without_full_squares = int(mod(float(width_without_indent), float(square_plus_border_plus_empty) *
        float(segment_height)));

        if (width_without_full_squares >= 0 && width_without_full_squares < line_height) {
            outColor = u_line_color;
            return;
        } else if (
            width_without_full_squares - line_height - square_height >= 0 &&
            width_without_full_squares - line_height - square_height < line_height
        ) {
            outColor = u_line_color;
        } else if (
            width_without_full_squares - line_height >= 0 &&
            width_without_full_squares - line_height < square_height
        ) {
            outColor = u_square_color;
        } else {
            outColor = u_bckg_color;
        }

    }
}
