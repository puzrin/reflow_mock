include <utils.scad>;
include <fan_pi5_data.scad>;

$fn = $preview ? 16 : 64;

// Inserts size for PCB mount (M1.6)
insert_d = 2.5 + 0.1;
insert_h = 4 + 0.3;
insert_pcb_x_offset = 2.5;
insert_pcb_y_offset = 25;

// !!! Measure magnets height before case order.
// Magnets from Aliexpress can be smaller than declared size
magnet_d = 6;
magnet_h = 6;
magnet_margin_h = 0.2;
magnet_axis_offset = 3.5;

wall_hor = 2;
wall_side = 1.75;

pcb_wx = 90;
pcb_wy = 80;
pcb_r= 3;
pcb_support_w = 0.5;
pcb_side_margin = 0.1;
pcb_top_margin = 0.1; // extra space for better cap close
// 1.6 PCB + margin
pcb_h  = 1.6 + pcb_top_margin;

case_wx = pcb_wx + 2*wall_side;
case_wy = pcb_wy + 2*wall_side;

case_locker = 1; // ring size to position cap to tray

case_r_vert = pcb_r + wall_side;
case_r_bottom = 1;
case_r_top = 1;

cap_stiffener_h = 12 + 4;

tray_inner_h = 8; //6.7;
tray_h  = tray_inner_h + wall_hor + pcb_h;

// plate (4) + space (12) + reflector (1.2/1.6) + space (4) + shield (1.2) + extra (1)
//cap_inner_h = 4 + 12 + 1.6 + 4 + 1.2 + 2;
cap_inner_h = 31.5;

cap_h = cap_inner_h + wall_hor;
cap_pcb_margin = 0.1;

// Set btn height to make hole h = 3mm. For easy cleanup with drill bit.
btn_h = 2.8; // 3mm - 2*margin
btn_w = 7.8;
btn_margin = 0.1;

btn_pusher_w = 12;
btn_pusher_base_w = 1.5;
btn_pusher_pcb_depth = 6;

led_h = 0.85; // 0.5...0.6 for different models

module case_left(ofs = 0) { tr_x(ofs - case_wx/2) children(); }
module case_right(ofs = 0) { tr_x(ofs + case_wx/2) children(); }
module case_front(ofs = 0) { tr_y(ofs - case_wy/2) children(); }
module case_back(ofs = 0) { tr_y(ofs + case_wy/2) children(); }

// esp32 - 3.2mm, USB - 3.26mm
assert(tray_inner_h > 3.5, "Not enougth room for PCB components");

module usb_hole() {
    // outer sizes
    usb_w = 8.94;
    usb_h = 3.26;
    usb_r = 1.0;

    tr_z(-usb_h/2)
    rotate_x (-90) {
        w = usb_w + 0.4;
        h = usb_h + 0.4;

        tr_z(-e) rcube([w, h, 10], r=usb_r);

        mirror_z() rcube([w, h, 10], r=usb_r);
        mirror_y() mirror_z() tr_x(-w/2) linear_extrude(10) square(w, 10);
    }
}

module tray_pcb_holder() {
    r = insert_d/2 + 1.2;
    h = tray_inner_h; // - 0.3;

    tr_z(wall_hor-e)
    difference() {
        linear_extrude(h)
        rsquare([2*r, 2*r], r=[0, 0, r, r], center = true);

        tr_z(h+e) mirror_z() cylinder(h=insert_h, r=insert_d/2);
    }
}

module magnet_support(h = 20) {
    r = magnet_d/2;
    reserve_w = 1;
    mh = magnet_h + magnet_margin_h;
    assert(mh <= tray_inner_h, "Tray inner too small for desired magnet height");
    
    pin_h = 0.5;
    pin_w = 1.25;

    dupe_xy()
    tr_xy(pcb_wx/2 - 3.5, pcb_wy/2 - 3.5)
    union() {
        difference() {
            rotate_extrude(angle=90) square([r+reserve_w, h]);
            tr_z(h - (mh+pin_h)) cylinder(h = mh+pin_h+e, r = r+e);
        }
        rotate_extrude(angle=90) square([pin_w, h - mh]);
    }
}

module _tray_base() {
    difference() {
        rcube([case_wx, case_wy, tray_h], r = case_r_vert, rbottom = case_r_bottom);

        // Inner
        tr_z(wall_hor)
        rcube(
            [case_wx-2*wall_side-2*pcb_support_w, case_wy-2*wall_side-2*pcb_support_w, tray_h-wall_hor+e],
            r = magnet_d/2
        );

        // PCB placement
        tr_z(tray_h-pcb_h)
        rcube(
            [case_wx-2*wall_side+2*pcb_side_margin, case_wy-2*wall_side+2*pcb_side_margin, pcb_h+e],
            r = pcb_r+pcb_side_margin
        );
        
        // Ensure space for magnets
        dupe_xy () {
            translate([pcb_wx/2 - magnet_axis_offset, pcb_wy/2 - magnet_axis_offset, wall_hor])
            cylinder(h = tray_h, d = magnet_d);
        }

    }
}


module tray() {
    difference() {
        union() {
            _tray_base();

            tr_z(wall_hor-e) magnet_support(tray_inner_h);

            // Inserts holders
            dupe_xy()
            tr_y(insert_pcb_y_offset)
            tr_x(-pcb_wx/2 + insert_pcb_x_offset) tray_pcb_holder();
            
            // PCB supports
            dupe_xy()
            tr_xy(7, -pcb_wy/2) tr_z(wall_hor--e) cube([1.5, 1.5, tray_inner_h]);

            // Button guides
            dupe_x()
            tr_z(wall_hor-e)
            tr_x(btn_pusher_w/2 + 0.25)
            tr_y(-pcb_wy/2 + btn_pusher_pcb_depth + 1)
            mirror_y() cube([2, 4, 1.7]);

            // Stiffeners
            rcube([pcb_wx, 2.0, 2+wall_hor], r=0);
            dupe_y() tr_y(20) rcube([pcb_wx, 2.0, 2+wall_hor], r=0);

            dupe_x() {
                tr_x(9) rcube([2.0, pcb_wy, 2+wall_hor], r=0);
                tr_x(27) rcube([2.0, pcb_wy, 2+wall_hor], r=0);
            }
        }

        // Button hole
        case_front(wall_side+pcb_support_w+e) tr_z(tray_h/2)
        rotate_x(90)
        rcube(
            [btn_w + 2*btn_margin, btn_h + 2*btn_margin, wall_side+pcb_support_w+2e],
            r=btn_h/2+btn_margin
        );

        // USB connector
        tr_z(tray_h-pcb_h) tr_y(pcb_wy/2+pcb_side_margin) usb_hole();
        
        // Bottom heels
        dupe_xy() tr_xy(case_wx/2 - 7.5, case_wy/2 - 7.5) tr_z(-e) cylinder(h=1, d=6.2);

        // Partially remove stifffeners for pi5 fan & air duct
        translate([-9+1, -38/2, wall_hor]) cube([52.5, 38, 2+e]);
        // Extra space for fan mounting
        for (i = fan_mount_coords) {
            tr_xy(5, -15)
            translate(i)
            tr_z(wall_hor+e) mirror_z() cylinder(h=1, d=4.5);
        }
    }
}

module cap_stiffener_x() {
    h = cap_stiffener_h;

    tr_y(-pcb_wy/2-cap_pcb_margin-e)
    tr_z(wall_hor-e) tr_x(1)
    rotate_y(-90)
    linear_extrude(2) 
    polygon([[0,0], [h,0], [h-4,4], [0,4]]);
}

module cap_stiffener_y() {
    h = cap_stiffener_h;

    tr_x(pcb_wx/2+cap_pcb_margin+e)
    rotate_z(90)
    tr_z(wall_hor-e) tr_x(1)
    rotate_y(-90)
    linear_extrude(2) 
    polygon([[0,0], [h,0], [h-4,4], [0,4]]);
}

module cap() {
    union() {
        difference() {
            rcube([case_wx, case_wy, cap_h],
                r = case_r_vert, rbottom = case_r_bottom);

            tr_z(wall_hor) rcube([pcb_wx+cap_pcb_margin*2, pcb_wy+cap_pcb_margin*2, cap_h], r = magnet_d/2);

            // Ensure space for magnets
            dupe_xy () {
                translate([pcb_wx/2 - magnet_axis_offset, pcb_wy/2 - magnet_axis_offset, wall_hor])
                cylinder(h = cap_h, d = magnet_d);
            }

            // Small cone conductors for alu cover
            gap = 0.6;

            tr_z(cap_h)
            hull () {
                cube([pcb_wx + gap*2, pcb_wy-2*(magnet_d/2+pcb_support_w), e], center=true);
                tr_z(-gap) cube([pcb_wx, pcb_wy-2*(magnet_d/2+pcb_support_w), e], center=true);

            };

            tr_z(cap_h)
            hull () {
                cube([pcb_wx-2*(magnet_d/2+pcb_support_w), pcb_wy + gap*2, e], center=true);
                tr_z(-gap) cube([pcb_wx-2*(magnet_d/2+pcb_support_w), pcb_wy, e], center=true);

            };
        }

        tr_z(wall_hor-e) magnet_support(cap_inner_h);

        // Stiffeneres
        dupe_y() {
            cap_stiffener_x();
            dupe_x() tr_x(22) cap_stiffener_x();
        }
        
        dupe_xy() tr_y(12) cap_stiffener_y();
    }
}

module button() {
    btn_middle_h = tray_h/2 - wall_hor;
    btn_inner_depth = btn_pusher_pcb_depth - pcb_support_w;
    // Calculate back size to leave 0.5mm to led
    btn_back_h = (tray_inner_h - led_h - btn_middle_h - 0.5)*2;

    // "ring" should be > 0.3mm
    assert(btn_back_h - btn_h > 0.3*2, "Too few space for button");

    // temporary guides
    //tr_z(tray_inner_h) linear_extrude(0.1) square(10, center=true);
    //tr_z(tray_inner_h-led_h) linear_extrude(0.1) square(10, center=true);
    //tr_z(-0.1) linear_extrude(0.1) square(10, center=true);

    //tr_z(btn_middle_h) rotate_x(-90)
    difference () {
        union () {
            // Front part, 1mm out of case
            tr_z(btn_inner_depth - e)
            linear_extrude(wall_side + pcb_support_w + 1)
            rsquare([btn_w, btn_h], r=btn_h/2);

            // Inner
            linear_extrude(btn_inner_depth)
            rsquare([btn_pusher_w, btn_back_h], r=1.0);

            // Pusher
            p_space = 0.3; // total top/bottom margin, 0.15mm each,
            p_h = tray_inner_h - p_space;

            tr_y(-tray_inner_h/2 + btn_middle_h)
            rcube([btn_pusher_w, p_h, btn_pusher_base_w], r=1.0);
        }

        // Light mirror
        mside = btn_back_h - 1;
        m_w = btn_pusher_w - 3;

        tr_z(btn_pusher_base_w)
        tr_xy(m_w/2, btn_back_h/2+e) rotate_y(-90)
        linear_extrude(m_w)
        polygon([[0, 0], [mside, 0], [0, -mside]]);
    }
}

DRAW_TRAY = 0;
DRAW_CAP = 0;
DRAW_BTN = 0;

if (!DRAW_TRAY && !DRAW_CAP && !DRAW_BTN) {
    tray();
    tr_x(100) cap();
    tr_x(-70) button();
}
else {
    if (DRAW_TRAY) { tray(); }
    if (DRAW_CAP) { tr_x(100) cap(); }
    if (DRAW_BTN) { tr_x(-70) button(); }
}