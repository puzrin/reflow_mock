#include "logger.hpp"
#include "rpc/rpc.hpp"
#include "components/prefs.hpp"
#include "app.hpp"

extern "C" {
    void app_main(void);
}

extern "C" void app_main() {
    logger_start();
    PrefsWriter::getInstance().start();

    application.setup();

    // Demo methods
    rpc.addMethod("echo", [](const std::string msg)-> std::string { return msg; });
    rpc.addMethod("bintest", [](const std::vector<uint8_t> data) -> std::vector<uint8_t> {
        std::vector<uint8_t> result;
        for(uint8_t byte : data) result.push_back(static_cast<uint8_t>(byte + 3));
        return result;
    });
    rpc.addMethod("devnull", [](const std::vector<uint8_t> msg)-> bool { return true; });
    rpc.addMethod("get16K", []() -> std::vector<uint8_t> {
        std::vector<uint8_t> result(1024*16, 0xF0);
        return result;
    });

    rpc_start();
}
