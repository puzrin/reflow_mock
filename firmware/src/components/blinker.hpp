#pragma once
#include "driver/ledc.h"
#include "driver/periph_ctrl.h"
#include "esp_timer.h"
#include "freertos/FreeRTOS.h"
#include "freertos/timers.h"
#include "lib/blinker_engine.hpp"

class LedDriver : public IBlinkerLED<1> {
public:
    LedDriver() {
        periph_module_enable(PERIPH_LEDC_MODULE);

        ledc_timer_config_t timer_conf = {
            .speed_mode = LEDC_LOW_SPEED_MODE,
            .duty_resolution = LEDC_TIMER_8_BIT,
            .timer_num = timerNum,
            .freq_hz = 5000,
            .clk_cfg = LEDC_AUTO_CLK
        };
        ledc_timer_config(&timer_conf);

        ledc_channel_config_t ch_conf = {
            .gpio_num = ledPin,
            .speed_mode = LEDC_LOW_SPEED_MODE,
            .channel = channelNum,
            .intr_type = LEDC_INTR_DISABLE,
            .timer_sel = timerNum,
            .duty = 0,
            .hpoint = 0,
            .flags = {
                // Output should be inverted, because of the way the LED is connected
                .output_invert = 1
            }
        };
        ledc_channel_config(&ch_conf);
    }

    void set(const DataType& value) override {
        ledc_set_duty(LEDC_LOW_SPEED_MODE, channelNum, value[0]);
        ledc_update_duty(LEDC_LOW_SPEED_MODE, channelNum);
    }

private:
    static constexpr int ledPin{GPIO_NUM_8};
    static constexpr ledc_timer_t timerNum{LEDC_TIMER_0};
    static constexpr ledc_channel_t channelNum{LEDC_CHANNEL_0};
};

template <typename Driver>
class Blinker : public BlinkerEngine<Driver> {
private:
    TimerHandle_t timer;

    static void timerCallback(TimerHandle_t timer) {
        Blinker* self = static_cast<Blinker*>(pvTimerGetTimerID(timer));
        self->tick(esp_timer_get_time() / 1000);
    }

public:
    void start() {
        timer = xTimerCreate(
            "BlinkerTimer",
            pdMS_TO_TICKS(20),
            pdTRUE,
            this,
            timerCallback
        );
        xTimerStart(timer, 0);
    }
};